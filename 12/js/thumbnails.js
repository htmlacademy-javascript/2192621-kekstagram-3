import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
let cachedPhotos = [];

const createThumbnail = (photo) => {
  const pictureClone = pictureTemplate.cloneNode(true);
  const image = pictureClone.querySelector('.picture__img');
  const pictureLikes = pictureClone.querySelector('.picture__likes');
  const pictureComments = pictureClone.querySelector('.picture__comments');
  const pictureElement = pictureClone.querySelector('.picture');
  image.src = photo.url;
  image.alt = photo.description;
  pictureLikes.textContent = photo.likes;
  pictureComments.textContent = photo.comments.length;
  pictureElement.dataset.photoId = photo.id;

  return pictureClone;
};

const renderThumbnails = (photos) => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => picture.remove());
  cachedPhotos = photos;

  photos.forEach((photo) => {
    fragment.append(createThumbnail(photo));
  });

  picturesContainer.append(fragment);
};

const onPicturesContainerClick = (evt) => {
  const thumbnailElement = evt.target.closest('.picture');
  if (!thumbnailElement) {
    return;
  }

  evt.preventDefault();

  const photoId = thumbnailElement.dataset.photoId;
  const currentPhoto = cachedPhotos.find((photo) => photo.id === Number(photoId));
  openBigPicture(currentPhoto);
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

export { renderThumbnails };
