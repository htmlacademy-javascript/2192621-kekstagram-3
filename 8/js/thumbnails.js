const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const pictureClone = pictureTemplate.cloneNode(true);
  const image = pictureClone.querySelector('.picture__img');
  const pictureLikes = pictureClone.querySelector('.picture__likes');
  const pictureComments = pictureClone.querySelector('.picture__comments');
  image.src = photo.url;
  image.alt = photo.description;
  pictureLikes.textContent = photo.likes;
  pictureComments.textContent = photo.comments.length;

  return pictureClone;
};

const renderThumbnails = (photos) => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => picture.remove());

  for (const photo of photos) {
    fragment.append(createThumbnail(photo));
  }

  picturesContainer.append(fragment);
};

export { renderThumbnails };
