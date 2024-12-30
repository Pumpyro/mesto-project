import "../pages/index.css";
import { createCard, updateCardLikes } from "./card.js";
import { enableValidation, checkValidation } from "./validate.js";
import { openModal, closeModal } from "./modal.js";

import {
  getInitialCards,
  getUserInfo,
  changeUserInfo,
  changeAvatar,
  addCard,
  deleteCard,
  toggleLike,
} from "./api.js";

// user data
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// cards list
const placesList = document.querySelector(".places__list");

// popups
const profileFormPopup = document.querySelector(".popup_type_edit");
const cardFormPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarFormPopup = document.querySelector(".popup_type_avatar");

// popup elements
const image = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");

// animating popups
profileFormPopup.classList.add("popup_is-animated");
cardFormPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

// popup buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// popups
const profileFormElement = profileFormPopup.querySelector(".popup__form");
const profileFormButton = profileFormElement.querySelector(".popup__button");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const aboutInput = profileFormElement.querySelector(
  ".popup__input_type_description"
);
nameInput.value = profileTitle.textContent;
aboutInput.value = profileDescription.textContent;

const cardFormElement = cardFormPopup.querySelector(".popup__form");
const cardFormButton = cardFormElement.querySelector(".popup__button");
const cardNameInput = cardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = cardFormElement.querySelector(".popup__input_type_url");

const avatarFormElement = avatarFormPopup.querySelector(".popup__form");
const avatarFormButton = avatarFormElement.querySelector(".popup__button");
const avatarLinkInput = avatarFormElement.querySelector(
  ".popup__input_type_url"
);

// cards
placesList.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    image.src = "";
    image.src = event.target.src;
    caption.textContent = event.target.alt;
    openModal(imagePopup);
  } else if (event.target.classList.contains("card__like-button")) {
    event.target.disabled = true;
    const cardItem = event.target.closest(".places__item");
    let type;
    if (event.target.classList.contains("card__like-button_is-active")) {
      type = "DELETE";
    } else {
      type = "PUT";
    }
    toggleLike(cardItem.id, type)
      .then((cardInfo) => {
        const newCardItem = updateCardLikes(cardItem, cardInfo.likes.length);
        cardItem.replaceWith(newCardItem);
        event.target.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        event.target.disabled = false;
      });
  } else if (event.target.classList.contains("card__delete-button")) {
    event.target.disabled = true;
    const cardItem = event.target.closest(".places__item");
    deleteCard(cardItem.id)
      .then((res) => {
        cardItem.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

let userId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;

    cards.forEach((cardInfo) => {
      const link = cardInfo.link;
      const name = cardInfo.name;
      const likesCount = cardInfo.likes.length;
      const _id = cardInfo._id;
      const newCard = createCard(link, name, likesCount, _id);
      if (cardInfo.likes.some((user) => user._id === userId)) {
        newCard
          .querySelector(".card__like-button")
          .classList.add("card__like-button_is-active");
      }
      if (cardInfo.owner._id !== userId) {
        newCard
          .querySelector(".card__delete-button")
          .classList.add("card__delete-button_unactive");
      }
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// popups

profileAvatar.addEventListener("click", (event) => {
  avatarLinkInput.value = profileAvatar.style.backgroundImage.slice(5, -2);
  checkValidation(avatarFormElement, validationSettings);
  openModal(avatarFormPopup);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  avatarFormButton.textContent = "Сохраняем...";
  const body = {
    avatar: avatarLinkInput.value,
  };

  changeAvatar(body)
    .then((userInfo) => {
      profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
      closeModal(avatarFormPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarFormButton.textContent = "Сохранить";
    });
}

avatarFormPopup.addEventListener("submit", handleAvatarFormSubmit);

profileEditButton.addEventListener("click", (event) => {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;

  checkValidation(profileFormElement, validationSettings);
  openModal(profileFormPopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileFormButton.textContent = "Сохраняем...";
  const body = {
    name: nameInput.value,
    about: aboutInput.value,
  };

  changeUserInfo(body)
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(profileFormPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileFormButton.textContent = "Сохранить";
    });
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", () => {
  cardLinkInput.value = "";
  cardNameInput.value = "";

  checkValidation(cardFormElement, validationSettings);
  openModal(cardFormPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  cardFormButton.textContent = "Создаем...";
  const body = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  addCard(body)
    .then((cardInfo) => {
      const link = cardInfo.link;
      const name = cardInfo.name;
      const likesCount = cardInfo.likes.length;
      const _id = cardInfo._id;
      const newCard = createCard(link, name, likesCount, _id);
      placesList.prepend(newCard);
      closeModal(cardFormPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardFormButton.textContent = "Создать";
    });
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);

// validation
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationSettings);
