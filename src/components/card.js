const cardTemplate = document.querySelector("#card-template").content;

export default function createCard(link, title) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardTitle.textContent = title;
    cardImage.src = link;
    cardImage.alt = title;
  
    return cardElement;
  }