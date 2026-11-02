import { getData } from './api.js';
import { showDataError } from './message.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';

getData().then((photos) => {
  renderThumbnails(photos);
}).catch(() => {
  showDataError();
});
