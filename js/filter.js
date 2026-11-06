import { getRandomInteger } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const getRandomPhotos = (photos) => {
  const randomPhotos = photos.slice();
  const count = Math.min(RANDOM_PHOTOS_COUNT, randomPhotos.length);

  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomInteger(i, randomPhotos.length - 1);
    [randomPhotos[i], randomPhotos[randomIndex]] = [randomPhotos[randomIndex], randomPhotos[i]];
  }
  return randomPhotos.slice(0, count);
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
