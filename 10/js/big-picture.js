import { createBigPictureRenderer } from './big-picture-render.js';

const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('#picture-cancel');
const renderBigPicture = createBigPictureRenderer(bigPicture);

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  renderBigPicture(photo);

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

buttonClose.addEventListener('click', closeBigPicture);

export { openBigPicture };
