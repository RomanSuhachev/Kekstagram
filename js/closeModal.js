import { bigPictureContainer } from "./showBigPicture.js";

const closeModalBtn = bigPictureContainer.querySelector('.cancel');

closeModalBtn.addEventListener('click', () => {
  bigPictureContainer.classList.add('hidden');
  document.body.style.overflow = 'auto';
});
