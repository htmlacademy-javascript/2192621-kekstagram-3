const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview img');

let currentScale = SCALE_MAX;

const updateScale = (value) => {
  currentScale = value;
  scaleValue.value = `${value}%`;
  previewImg.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => {
  const newValue = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScale(newValue);
};

const onBiggerButtonClick = () => {
  const newValue = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScale(newValue);
};

scaleSmaller.addEventListener('click', onSmallerButtonClick);
scaleBigger.addEventListener('click', onBiggerButtonClick);

const resetScale = () => {
  updateScale(SCALE_MAX);
};

export { resetScale };
