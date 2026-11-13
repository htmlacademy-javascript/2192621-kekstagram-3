import { getData } from './api.js';
import { showDataError } from './message.js';
import { renderThumbnails } from './thumbnails.js';
import { getFilteredPhotos } from './filter.js';
import { debounce } from './util.js';

import './form.js';

const RERENDER_DELAY = 500;

const filtersContainerElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');

const rerenderThumbnailsDebounced = debounce((photos, id) => {
  const filteredPhotos = getFilteredPhotos(photos, id);
  renderThumbnails(filteredPhotos);
}, RERENDER_DELAY);

const initFilters = (photos) => {
  filtersContainerElement.classList.remove('img-filters--inactive');
  let activeFilterButtonElement = document.querySelector('.img-filters__button--active');

  filtersFormElement.addEventListener('click', (evt) => {
    const targetButtonElement = evt.target;

    if (!targetButtonElement.classList.contains('img-filters__button')) {
      return;
    }

    if (targetButtonElement === activeFilterButtonElement) {
      return;
    }

    activeFilterButtonElement.classList.remove('img-filters__button--active');
    targetButtonElement.classList.add('img-filters__button--active');
    activeFilterButtonElement = targetButtonElement;
    rerenderThumbnailsDebounced(photos, targetButtonElement.id);
  });
};

getData().then((photos) => {
  renderThumbnails(photos);
  initFilters(photos);
}).catch(() => {
  showDataError();
});
