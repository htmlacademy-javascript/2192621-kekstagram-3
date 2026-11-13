import { createBigPictureRenderer } from './big-picture-render.js';
import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const buttonCloseElement = bigPictureElement.querySelector('#picture-cancel');
const renderBigPicture = createBigPictureRenderer(bigPictureElement);

const openBigPicture = (photo) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  renderBigPicture(photo);

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

buttonCloseElement.addEventListener('click', closeBigPicture);

export { openBigPicture };
