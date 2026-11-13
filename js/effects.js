const Effects = {
  NONE: {
    style: 'none'
  },
  CHROME: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  SEPIA: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  MARVIN: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  PHOBOS: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  HEAT: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const previewImgElement = document.querySelector('.img-upload__preview img');
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectsListElement = document.querySelector('.effects__list');

let chosenEffect = Effects.NONE;

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value)
  }
});

const applyDefaultEffect = () => {
  previewImgElement.style.filter = 'none';
  effectLevelValueElement.value = '';
  effectLevelContainerElement.classList.add('hidden');
};

applyDefaultEffect();

effectLevelSliderElement.noUiSlider.on('update', () => {
  const value = effectLevelSliderElement.noUiSlider.get();
  effectLevelValueElement.value = value;
  previewImgElement.style.filter = `${chosenEffect.style}(${value}${chosenEffect.unit})`;
});

effectsListElement.addEventListener('change', (evt) => {
  const effectName = evt.target.value.toUpperCase();
  chosenEffect = Effects[effectName];

  if (chosenEffect === Effects.NONE) {
    applyDefaultEffect();
    return;
  }

  effectLevelContainerElement.classList.remove('hidden');

  effectLevelSliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max
    },
    start: chosenEffect.max,
    step: chosenEffect.step
  });
});

const resetEffects = () => {
  chosenEffect = Effects.NONE;
  applyDefaultEffect();
};

export { resetEffects };
