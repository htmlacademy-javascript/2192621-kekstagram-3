import { getRandomInteger } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const getRandomPhotos = (photos) => {
  const copiedArray = photos.slice();
  const count = Math.min(RANDOM_PHOTOS_COUNT, copiedArray.length);

  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomInteger(i, copiedArray.length - 1);
    [copiedArray[i], copiedArray[randomIndex]] = [copiedArray[randomIndex], copiedArray[i]];
  }
  return copiedArray.slice(0, count);
};

const compareComments = (photoA, photoB) => {
  const photoACommentsLength = photoA.comments.length;
  const photoBCommentsLength = photoB.comments.length;
  return photoBCommentsLength - photoACommentsLength;
};

const getFilteredPhotos = (photos, filterType) => {
  switch (filterType) {
    case Filter.RANDOM:
      return getRandomPhotos(photos);
    case Filter.DISCUSSED:
      return photos.slice().sort(compareComments);
    case Filter.DEFAULT:
    default:
      return photos.slice();
  }
};

export { getFilteredPhotos };
