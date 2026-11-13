import { openBigPicture } from './big-picture.js';

const pictureTemplateFragment = document.querySelector('#picture').content;
const picturesContainerElement = document.querySelector('.pictures');
let cachedPhotos = [];

const createThumbnail = (photo) => {
  const pictureCloneFragment = pictureTemplateFragment.cloneNode(true);
  const pictureImageElement = pictureCloneFragment.querySelector('.picture__img');
  const pictureLikesElement = pictureCloneFragment.querySelector('.picture__likes');
  const pictureCommentsElement = pictureCloneFragment.querySelector('.picture__comments');
  const pictureElement = pictureCloneFragment.querySelector('.picture');
  pictureImageElement.src = photo.url;
  pictureImageElement.alt = photo.description;
  pictureLikesElement.textContent = photo.likes;
  pictureCommentsElement.textContent = photo.comments.length;
  pictureElement.dataset.photoId = photo.id;

  return pictureCloneFragment;
};

const renderThumbnails = (photos) => {
  const pictureElements = picturesContainerElement.querySelectorAll('.picture');
  const picturesFragment = document.createDocumentFragment();
  pictureElements.forEach((pictureElement) => pictureElement.remove());
  cachedPhotos = photos;

  photos.forEach((photo) => {
    picturesFragment.append(createThumbnail(photo));
  });

  picturesContainerElement.append(picturesFragment);
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

picturesContainerElement.addEventListener('click', onPicturesContainerClick);

export { renderThumbnails };
