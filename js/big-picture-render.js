const COMMENT_AVATAR_SIZE = 35;
const COMMENTS_PORTION = 5;

const createCommentElement = (comment) => {
  const listItemElement = document.createElement('li');
  listItemElement.classList.add('social__comment');

  const imageElement = document.createElement('img');
  imageElement.classList.add('social__picture');
  imageElement.src = comment.avatar;
  imageElement.alt = comment.name;
  imageElement.width = COMMENT_AVATAR_SIZE;
  imageElement.height = COMMENT_AVATAR_SIZE;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  listItemElement.append(imageElement, textElement);

  return listItemElement;
};

const createBigPictureRenderer = (bigPictureElement) => {
  const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
  const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
  const bigPictureSocialCommentsElement = bigPictureElement.querySelector('.social__comments');
  const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
  const bigPictureCommentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
  const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
  const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');

  let currentPhoto = null;
  let commentsShown = 0;

  const renderComments = () => {
    const nextCommentsShown = Math.min(commentsShown + COMMENTS_PORTION, currentPhoto.comments.length);
    const displayedComments = currentPhoto.comments.slice(commentsShown, nextCommentsShown);

    const commentsFragment = document.createDocumentFragment();
    displayedComments.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      commentsFragment.append(commentElement);
    });

    bigPictureSocialCommentsElement.append(commentsFragment);

    commentsShown = nextCommentsShown;
    commentShownCountElement.textContent = commentsShown;

    commentsLoaderElement.classList.toggle('hidden', commentsShown >= currentPhoto.comments.length);
  };

  commentsLoaderElement.addEventListener('click', renderComments);

  return (photo) => {
    currentPhoto = photo;
    commentsShown = 0;

    bigPictureImgElement.src = photo.url;
    bigPictureImgElement.alt = photo.description;
    bigPictureLikesElement.textContent = photo.likes;
    bigPictureDescriptionElement.textContent = photo.description;
    bigPictureCommentsCountElement.textContent = photo.comments.length;

    bigPictureSocialCommentsElement.innerHTML = '';

    renderComments();
  };
};

export { createBigPictureRenderer };
