import { showMessage } from './message.js';
import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { resetPreview, setupUploadPreview } from './preview.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const VALID_HASHTAG_REGEX = /^#[a-zа-яё0-9]+$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('.img-upload__cancel');

const textHashtagsElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');

const submitButtonElement = document.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const openUploadForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormElement.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  resetPreview();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

setupUploadPreview(openUploadForm);

uploadCancelElement.addEventListener('click', closeUploadForm);

uploadFormElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && (evt.target === textHashtagsElement || evt.target === textDescriptionElement)) {
    evt.stopPropagation();
  }
});

const parseHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const validateHashtagCount = (value) => parseHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagSymbols = (value) => {
  const hashtags = parseHashtags(value);
  return hashtags.every((hashtag) => {
    const isValidSymbols = VALID_HASHTAG_REGEX.test(hashtag);
    const isValidLength = hashtag.length >= MIN_HASHTAG_LENGTH && hashtag.length <= MAX_HASHTAG_LENGTH;
    return isValidSymbols && isValidLength;
  });
};

const validateHashtagUnique = (value) => {
  const hashtags = parseHashtags(value);
  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  return uniqueHashtags.size === hashtags.length;
};

const validationRules = [
  {
    element: textDescriptionElement,
    validator: validateCommentLength,
    errorMessage: `длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`
  },
  {
    element: textHashtagsElement,
    validator: validateHashtagCount,
    errorMessage: `нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`
  },
  {
    element: textHashtagsElement,
    validator: validateHashtagSymbols,
    errorMessage: `хэштег должен начинаться с #, состоять из букв и чисел и содержать от ${MIN_HASHTAG_LENGTH} до ${MAX_HASHTAG_LENGTH} символов`
  },
  {
    element: textHashtagsElement,
    validator: validateHashtagUnique,
    errorMessage: 'хэштеги не должны повторяться'
  }
];

validationRules.forEach((rule) => {
  pristine.addValidator(
    rule.element,
    rule.validator,
    rule.errorMessage
  );
});

const toggleSubmitButton = (isBlocked) => {
  submitButtonElement.disabled = isBlocked;
  submitButtonElement.textContent = isBlocked ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  toggleSubmitButton(true);

  sendData(new FormData(evt.target))
    .then(() => {
      closeUploadForm();
      showMessage('#success');
    })
    .catch(() => {
      showMessage('#error');
    })
    .finally(() => {
      toggleSubmitButton(false);
    });
});
