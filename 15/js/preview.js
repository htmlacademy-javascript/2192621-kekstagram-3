const FILE_TYPES = ['image/jpeg', 'image/png'];
const DEFAULT_PREVIEW = 'img/upload-default-image.jpg';

const uploadInput = document.querySelector('.img-upload__input');
const previewImg = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

let currentFileUrl = null;

const cleanUpFileUrl = () => {
  if (currentFileUrl) {
    URL.revokeObjectURL(currentFileUrl);
    currentFileUrl = null;
  }
};

const updateEffectsPreview = (url) => {
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = url ? `url('${url}')` : '';
  });
};

const resetPreview = () => {
  cleanUpFileUrl();
  previewImg.src = DEFAULT_PREVIEW;
  updateEffectsPreview('');
  uploadInput.value = '';
};

const setupUploadPreview = (onSuccess) => {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
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
    previewImg.src = currentFileUrl;

    updateEffectsPreview(currentFileUrl);

    onSuccess();
  });
};

export { resetPreview, setupUploadPreview };
