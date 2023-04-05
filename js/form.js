const uploadImageForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');
const uploadImageBtn = uploadImageForm.querySelector('.img-upload__input');
const closeUploadImageWindowbtn = uploadImageForm.querySelector('.img-upload__cancel');
const body = document.body;


uploadImageBtn.addEventListener('change', showUploadImageWindow);

function showUploadImageWindow() {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', isEscDown);
  closeUploadImageWindowbtn.addEventListener('click', hideUploadImageWindow);
  isShowModal();
}

function hideUploadImageWindow() {
  uploadImageBtn.value = '';
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown',isEscDown);
  isShowModal();
}

function isEscDown(evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    hideUploadImageWindow();
  }
}

function isShowModal() {
  uploadOverlay.classList.contains('hidden') ? body.classList.remove('modal-open') : body.classList.add('modal-open');
}

//Validate form with Pristine.js

