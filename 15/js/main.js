import { getData } from './api.js';
import { showDataError } from './message.js';
import { renderThumbnails } from './thumbnails.js';
import { getFilteredPhotos } from './filter.js';
import { debounce } from './util.js';

import './form.js';

const RERENDER_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const debouncedRerender = debounce((photos, id) => {
  const filteredPhotos = getFilteredPhotos(photos, id);
  renderThumbnails(filteredPhotos);
}, RERENDER_DELAY);

const initFilters = (photos) => {
  filtersContainer.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    const targetButton = evt.target;

    if (!targetButton.classList.contains('img-filters__button')) {
      return;
    }

    if (targetButton.classList.contains('img-filters__button--active')) {
      return;
    }

    const activeButton = filtersForm.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    targetButton.classList.add('img-filters__button--active');

    debouncedRerender(photos, targetButton.id);
  });
};

getData().then((photos) => {
  renderThumbnails(photos);
  initFilters(photos);
}).catch(() => {
  showDataError();
});
