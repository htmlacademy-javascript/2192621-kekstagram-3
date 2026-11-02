const COMMENT_AVATAR_SIZE = 35;
const COMMENTS_PORTION = 5;

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
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');

  let currentPhoto = null;
  let commentsShown = 0;

  const renderComments = () => {
    const nextCommentsShown = Math.min(commentsShown + COMMENTS_PORTION, currentPhoto.comments.length);
    const commentsSlice = currentPhoto.comments.slice(commentsShown, nextCommentsShown);

    const fragment = document.createDocumentFragment();
    commentsSlice.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      fragment.append(commentElement);
    });

    bigPictureSocialComments.append(fragment);

    commentsShown = nextCommentsShown;
    commentShownCount.textContent = commentsShown;

    commentsLoader.classList.toggle('hidden', commentsShown >= currentPhoto.comments.length);
  };

  commentsLoader.addEventListener('click', renderComments);

  return (photo) => {
    currentPhoto = photo;
    commentsShown = 0;

    bigPictureImg.src = photo.url;
    bigPictureImg.alt = photo.description;
    bigPictureLikes.textContent = photo.likes;
    bigPictureDescription.textContent = photo.description;
    bigPictureCommentsCount.textContent = photo.comments.length;

    bigPictureSocialComments.innerHTML = '';

    renderComments();
  };
};


export { createBigPictureRenderer };
