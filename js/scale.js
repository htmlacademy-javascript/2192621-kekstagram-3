const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const previewImgElement = document.querySelector('.img-upload__preview img');

let currentScale = SCALE_MAX;

const updateScale = (value) => {
  currentScale = value;
  scaleValueElement.value = `${value}%`;
  previewImgElement.style.transform = `scale(${value / SCALE_MAX})`;
};

const onSmallerButtonClick = () => {
  const newValue = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScale(newValue);
};

const onBiggerButtonClick = () => {
  const newValue = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScale(newValue);
};

scaleSmallerElement.addEventListener('click', onSmallerButtonClick);
scaleBiggerElement.addEventListener('click', onBiggerButtonClick);

const resetScale = () => {
  updateScale(SCALE_MAX);
};

export { resetScale };
