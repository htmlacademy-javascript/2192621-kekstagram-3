import { createPhotos } from './photos.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import './effects.js';

const photos = createPhotos();
renderThumbnails(photos);
