import { createPhotos } from './photos.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';

const photos = createPhotos();
renderThumbnails(photos);
