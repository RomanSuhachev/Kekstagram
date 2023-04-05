import { getPictures } from './data.js';
import { renderPictures } from './pictureRender.js';
import { showBigImage } from './showBigPicture.js';
import './form.js';

renderPictures(getPictures());
