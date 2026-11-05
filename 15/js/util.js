const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};

export { isEscapeKey, getRandomInteger, debounce };
