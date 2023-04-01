import { otherPictures } from "./pictureRender.js";

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureLikesCount = bigPictureContainer.querySelector('.big-picture__social .social__likes');
const commentsCount = document.querySelector('.social__comment-count .comments-count');

otherPictures.addEventListener('click', showBigImage);

function showBigImage(evt) {

  if(!evt.target.closest('.picture__img')) {
    return;
  }

  bigPictureContainer.classList.remove('hidden');

  document.body.classList.add('modal-open');
  const [bigPicture , src, info] = [bigPictureContainer.querySelector('img'), evt.target.src, evt.target.closest('a').querySelector('.picture__info')];
  const [comments, likes] = Array.from(info.children);
  bigPicture.src = src;
  bigPictureLikesCount.querySelector('.likes-count').textContent = likes.textContent;
  commentsCount.textContent = comments.textContent;
}

export {bigPictureContainer}
