import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';
import {
  MESSAGES,
  NAMES,
  DESCRIPTIONS,
  AVATAR_MIN,
  AVATAR_MAX,
  MESSAGE_MIN,
  MESSAGE_MAX,
  LIKES_MIN,
  LIKES_MAX,
  COMMENTS_MIN,
  COMMENTS_MAX,
  PHOTO_COUNT
} from './data.js';

const generatePhotoId = createIdGenerator();

const generateCommentId = createIdGenerator();

const createAvatar = () =>
  `img/avatar-${getRandomInteger(AVATAR_MIN, AVATAR_MAX)}.svg`;

const createMessage = () => {
  const count = getRandomInteger(MESSAGE_MIN, MESSAGE_MAX);
  const firstMessage = getRandomArrayElement(MESSAGES);
  if (count === MESSAGE_MAX) {
    let secondMessage = getRandomArrayElement(MESSAGES);
    while (secondMessage === firstMessage) {
      secondMessage = getRandomArrayElement(MESSAGES);
    }
    return `${firstMessage} ${secondMessage}`;
  }
  return firstMessage;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: createAvatar(),
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = () => {
  const photoId = generatePhotoId();

  const commentCount = getRandomInteger(COMMENTS_MIN, COMMENTS_MAX);
  const comments = Array.from({ length: commentCount }, () => createComment());

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: comments
  };
};

const createPhotos = () => Array.from({ length: PHOTO_COUNT }, () => createPhoto());

export { createPhotos };
