const FILE_TYPES = ['image/jpeg', 'image/png'];
const DEFAULT_PREVIEW = 'img/upload-default-image.jpg';

const uploadInputElement = document.querySelector('.img-upload__input');
const previewImgElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');

let currentFileUrl = null;

const cleanUpFileUrl = () => {
  if (currentFileUrl) {
    URL.revokeObjectURL(currentFileUrl);
    currentFileUrl = null;
  }
};

const updateEffectsPreview = (url) => {
  effectPreviewElements.forEach((previewElement) => {
    previewElement.style.backgroundImage = url ? `url('${url}')` : '';
  });
};

const resetPreview = () => {
  cleanUpFileUrl();
  previewImgElement.src = DEFAULT_PREVIEW;
  updateEffectsPreview('');
  uploadInputElement.value = '';
};

const setupUploadPreview = (onSuccess) => {
  uploadInputElement.addEventListener('change', () => {
    const file = uploadInputElement.files[0];
    if (!file) {
      return;
    }

    const matches = FILE_TYPES.includes(file.type);

    if (!matches) {
      resetPreview();
      return;
    }

    cleanUpFileUrl();

    currentFileUrl = URL.createObjectURL(file);
    previewImgElement.src = currentFileUrl;

    updateEffectsPreview(currentFileUrl);

    onSuccess();
  });
};

export { resetPreview, setupUploadPreview };
