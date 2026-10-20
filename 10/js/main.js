import { createPhotos } from './photos.js';
import { renderThumbnails } from './thumbnails.js';

const photos = createPhotos();
renderThumbnails(photos);
