import { showBigImage } from "./showBigPicture.js";

const template = document.querySelector('#picture').content;
const pictureLink = template.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');

function createPictureElement(item) {

  const newPicture = pictureLink.cloneNode(true);

  const img = newPicture.querySelector('img');
  const pictureInfo = newPicture.querySelector('.picture__info');
  const pictureInfoChildren = Array.from(pictureInfo.children);
  const [comment, likes] = pictureInfoChildren;

  img.src = item.url;
  likes.textContent = item.likes;
  comment.textContent = item.comments.length;

  newPicture.addEventListener('click', () => {
    showBigImage(item);
  });

  return newPicture;
}

function renderPictures(pictures) {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPictureElement(picture);
    fragment.append(pictureElement);
  });
  pictureContainer.append(fragment);
}

export { renderPictures, pictureContainer };
