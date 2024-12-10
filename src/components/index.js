import '../pages/index.css';
import createCard from './card.js'
import { enableValidation, checkValidation} from './validate.js'
import { openModal, closeModal } from './modal.js'
import { initialCards } from './initialCards.js'




// user data
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

// cards list
const placesList = document.querySelector('.places__list')

// popups
const profileFormPopup = document.querySelector('.popup_type_edit')
const cardFormPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')

// popup elements
const image = imagePopup.querySelector('.popup__image')
const caption = imagePopup.querySelector('.popup__caption')

// animating popups
profileFormPopup.classList.add('popup_is-animated')
cardFormPopup.classList.add('popup_is-animated')
imagePopup.classList.add('popup_is-animated')

// popup buttons
const profileEditButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-button')




// cards
placesList.addEventListener('click', event => {
  if (event.target.classList.contains('card__image')) {
    image.src = ""
    image.src = event.target.src
    caption.textContent = event.target.alt
    openModal(imagePopup)
  } else if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active')
  } else if (event.target.classList.contains('card__delete-button')) {
    event.target.closest('.places__item').remove()
  }
})

initialCards.forEach(cardInfo => {
  const link = cardInfo['link']
  const name = cardInfo['name']
  const newCard = createCard(link, name)
  placesList.append(newCard)
})


// popups

const profileFormElement = profileFormPopup.querySelector('.popup__form')

const nameInput = profileFormElement.querySelector('.popup__input_type_name')
const jobInput = profileFormElement.querySelector('.popup__input_type_description')
nameInput.value = profileTitle.textContent
jobInput.value = profileDescription.textContent

profileEditButton.addEventListener('click', event => {

  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent

  checkValidation(profileFormElement, validationSettings)
  openModal(profileFormPopup)
})

function handleProfileFormSubmit(evt) {
  evt.preventDefault() 

  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value

  closeModal(profileFormPopup)
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit)


const cardFormElement = cardFormPopup.querySelector('.popup__form')

const titleInput = cardFormElement.querySelector('.popup__input_type_card-name')
const linkInput = cardFormElement.querySelector('.popup__input_type_url')

addCardButton.addEventListener('click', () => {

  linkInput.value = ''
  titleInput.value = ''

  checkValidation(cardFormElement, validationSettings)
  openModal(cardFormPopup)
})

function handleCardFormSubmit(evt) {
  evt.preventDefault()

  placesList.prepend(createCard(linkInput.value, titleInput.value))

  closeModal(cardFormPopup)
}

cardFormElement.addEventListener('submit', handleCardFormSubmit)


// validation
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationSettings)
