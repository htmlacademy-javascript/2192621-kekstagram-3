const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Лев',
  'Фёдор',
  'Пётр',
  'Андрей',
  'Николай',
  'Илья',
  'Василий',
  'Ипполит',
  'Анатолий',
  'Александр',
  'Михаил',
  'Матвей',
  'Алексей',
  'Сергей',
  'Виктор'
];

const DESCRIPTIONS = [
  'Красивый закат над морем',
  'Мой кот спит на подоконнике',
  'Чашка горячего кофе с круассаном',
  'Улыбающиеся друзья на пикнике',
  'Городские огни, отраженные в луже',
  'Щенок, впервые увидевший снег',
  'Бабушка вяжет у окна',
  'Поле подсолнухов до самого горизонта',
  'Ночное звёздное небо над палаткой',
  'Туманное утро в сосновом лесу',
  'Утрений кофе в любимой кружке'
];

const AVATAR_MIN = 1;
const AVATAR_MAX = 6;

const MESSAGE_MIN = 1;
const MESSAGE_MAX = 2;

const LIKES_MIN = 15;
const LIKES_MAX = 200;

const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;

const PHOTO_COUNT = 25;

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

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
  const comments = Array.from(
    { length: commentCount },
    () => createComment()
  );

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: comments
  };
};

const createPhotos = () => Array.from({ length: PHOTO_COUNT }, () => createPhoto());

createPhotos();
