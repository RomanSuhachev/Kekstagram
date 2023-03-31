import {pictures, comments} from './data.js';

const fragment = document.createDocumentFragment();
const template = document.querySelector('#picture').content;
const pictureLink = template.querySelector('.picture');
const otherPictures = document.querySelector('.pictures');


pictures.forEach((item) => getPictureElement(item));

function getPictureElement(item) {

  const newPicture = pictureLink.cloneNode(true);

  const img = newPicture.querySelector('img');
  const pictureInfo = newPicture.querySelector('.picture__info');
  const pictureInfoChildren = Array.from(pictureInfo.children);
  const [comment, likes] = pictureInfoChildren;

  img.src = item.url;
  likes.textContent = item.likes;
  comment.textContent = item.comments.length;

  fragment.append(newPicture);
  otherPictures.append(fragment);
}

