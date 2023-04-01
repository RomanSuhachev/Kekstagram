import { bigPictureContainer } from "./showBigPicture.js";

const closeModalBtn = bigPictureContainer.querySelector('.cancel');

closeModalBtn.addEventListener('click', () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if(evt.keyCode === 27) {
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
})
