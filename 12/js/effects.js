const EFFECTS = {
  none: {
    style: 'none'
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
};

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const previewImg = document.querySelector('.img-upload__preview img');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');

let chosenEffect = EFFECTS.none;

noUiSlider.create(effectLevelSlider, {
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
  previewImg.style.filter = 'none';
  effectLevelValue.value = '';
  effectLevelContainer.classList.add('hidden');
};

applyDefaultEffect();

effectLevelSlider.noUiSlider.on('update', () => {
  const value = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = value;
  previewImg.style.filter = `${chosenEffect.style}(${value}${chosenEffect.unit})`;
});

effectsList.addEventListener('change', (evt) => {
  const effectName = evt.target.value;
  chosenEffect = EFFECTS[effectName];

  if (chosenEffect === EFFECTS.none) {
    applyDefaultEffect();
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max
    },
    start: chosenEffect.max,
    step: chosenEffect.step
  });
});

const resetEffects = () => {
  chosenEffect = EFFECTS.none;
  applyDefaultEffect();
};

export { resetEffects };
