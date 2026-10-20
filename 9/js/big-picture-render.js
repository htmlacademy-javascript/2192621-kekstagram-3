const COMMENT_AVATAR_SIZE = 35;

const createCommentElement = (comment) => {
  const listItem = document.createElement('li');
  listItem.classList.add('social__comment');

  const image = document.createElement('img');
  image.classList.add('social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;
  image.width = COMMENT_AVATAR_SIZE;
  image.height = COMMENT_AVATAR_SIZE;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  listItem.append(image, text);

  return listItem;
};

const createBigPictureRenderer = (bigPicture) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');
  const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-total-count');
  const commentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');

  return (photo) => {
    bigPictureImg.src = photo.url;
    bigPictureImg.alt = photo.description;
    bigPictureLikes.textContent = photo.likes;
    bigPictureDescription.textContent = photo.description;
    bigPictureCommentsCount.textContent = photo.comments.length;
    commentShownCount.textContent = photo.comments.length;

    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    bigPictureSocialComments.innerHTML = '';

    const fragment = document.createDocumentFragment();

    photo.comments.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      fragment.append(commentElement);
    });

    bigPictureSocialComments.append(fragment);
  };
};


export { createBigPictureRenderer };
