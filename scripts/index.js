const cardTemplate = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupInputTypeName = document.querySelector(".popup__input_type_name");
const popupInputTypeDescription = document.querySelector(
  ".popup__input_type_description"
);
const popupInputIypeCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeUrl = document.querySelector(".popup__input_type_url");

function createCard(card) {
  const cardName = card.name;
  const cardLink = card.link;
  const cardEl = cardTemplate.content.cloneNode(true);
  const cardImage = cardEl.querySelector(".card__image");
  const cardTitle = cardEl.querySelector(".card__title");
  const cardLikeButton = cardEl.querySelector(".card__like-button");
  const cardDeleteButton = cardEl.querySelector(".card__delete-button");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  cardDeleteButton.addEventListener("click", () => {
    initialCards.map((item, index) => {
      if (item.name === cardName) {
        initialCards.splice(index, 1);
        drawCards(initialCards);
      }
    });
    console.log(initialCards);
  });

  cardImage.addEventListener("click", () => {
    openModal(imagePopup);
    const popupCaption = imagePopup.querySelector(".popup__caption");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupClose = imagePopup.querySelector(".popup__close");

    popupClose.addEventListener("click", () => {
      closeModal(imagePopup);
    });
    popupImage.src = cardImage.src;
    popupCaption.textContent = cardImage.alt;
  });
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  return cardEl;
}

function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function drawCards(cards) {
  placesList.innerHTML = "";
  cards.forEach((card) => {
    placesList.append(createCard(card));
  });
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(profilePopup);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  initialCards.unshift({
    name: popupInputIypeCardName.value,
    link: popupInputTypeUrl.value,
  });
  drawCards(initialCards);
  closeModal(cardPopup);
}

drawCards(initialCards);

profileEditButton.addEventListener("click", () => {
  const popupClose = profilePopup.querySelector(".popup__close");
  const popupForm = profilePopup.querySelector(".popup__form");
  openModal(profilePopup);

  popupClose.addEventListener("click", () => {
    closeModal(profilePopup);
  });
  popupForm.addEventListener("submit", handleProfileSubmit);
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", () => {
  const popupClose = cardPopup.querySelector(".popup__close");
  const popupForm = cardPopup.querySelector(".popup__form");
  popupInputIypeCardName.value = "";
  popupInputTypeUrl.value = "";
  openModal(cardPopup);

  popupClose.addEventListener("click", () => {
    closeModal(cardPopup);
  });
  popupForm.addEventListener("submit", handleCardSubmit);
});
