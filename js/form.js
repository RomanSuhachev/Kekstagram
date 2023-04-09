
const uploadImageForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');
const uploadImageBtn = uploadImageForm.querySelector('.img-upload__input');
const closeUploadImageWindowbtn = uploadImageForm.querySelector('.img-upload__cancel');
const textArea = document.querySelector('.text__description');
const hashTags = document.querySelector('.text__hashtags');
const body = document.body;
const uploadContainer = uploadImageForm.querySelector('.img-upload__wrapper');


uploadImageBtn.addEventListener('change', showUploadImageWindow);

function showUploadImageWindow() {
  uploadOverlay.classList.remove('hidden');
  closeUploadImageWindowbtn.addEventListener('click', hideUploadImageWindow);
  uploadContainer.addEventListener('click', (e) => {
    if(e.target == textArea || e.target == hashTags) {
      document.removeEventListener('keydown', isEscDown);
    }else {
      document.addEventListener('keydown', isEscDown);
    }
  });
  isShowModal();
}

function hideUploadImageWindow() {
  uploadImageBtn.value = '';
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown',isEscDown);
  uploadImageForm.reset();
  isShowModal();
}

function isEscDown(evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    hideUploadImageWindow();
  }
}

function isShowModal() {
  if(uploadOverlay.classList.contains('hidden')){
    body.classList.remove('modal-open');
  }else {
    body.classList.add('modal-open');
  }
}

//Validate form with Pristine.js

const pristine = new Pristine(uploadImageForm, {
  classTo: 'text__label',
  errorTextParent: 'text__label',
  errorTextClass: 'text__label--error',
});

uploadImageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const isValid = pristine.validate();

  if(isValid) {
    uploadImageForm.submit(deleteFormRedirect());
  }else {
    e.preventDefault();
  }
  console.log(isValid);
});


function deleteFormRedirect() {
  const data = new FormData(uploadImageForm);
  fetch(uploadImageForm.action, {method:uploadImageForm.method, body: data}).then(response => console.log(response));
  uploadImageForm.reset();
}
