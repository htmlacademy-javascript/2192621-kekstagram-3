import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const VALID_HASHTAG_REGEX = /^#[a-zа-яё0-9]+$/i;

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
  resetScale();
  resetEffects();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

uploadInput.addEventListener('change', openUploadForm);

uploadCancel.addEventListener('click', closeUploadForm);

uploadForm.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && (evt.target === textHashtags || evt.target === textDescription)) {
    evt.stopPropagation();
  }
});

const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  textDescription,
  validateDescription,
  `длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`
);

const parseHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

const validateHashtagsCount = (value) => {
  const hashtags = parseHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

pristine.addValidator(
  textHashtags,
  validateHashtagsCount,
  `нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`
);

const validateHashtagsSymbols = (value) => {
  const hashtags = parseHashtags(value);
  return hashtags.every((hashtag) => {
    const isValidSymbols = VALID_HASHTAG_REGEX.test(hashtag);
    const isValidLength = hashtag.length >= MIN_HASHTAG_LENGTH && hashtag.length <= MAX_HASHTAG_LENGTH;
    return isValidSymbols && isValidLength;
  });
};

pristine.addValidator(
  textHashtags,
  validateHashtagsSymbols,
  `хэштег должен начинаться с #, состоять из букв и чисел и содержать от ${MIN_HASHTAG_LENGTH} до ${MAX_HASHTAG_LENGTH} символов`
);

const validateHashtagsUnique = (value) => {
  const hashtags = parseHashtags(value);
  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  return uniqueHashtags.size === hashtags.length;
};

pristine.addValidator(
  textHashtags,
  validateHashtagsUnique,
  'хэштеги не должны повторяться'
);

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
