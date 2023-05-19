import { isEsc } from "./util.js";
import { setDefaultScale } from "./filter.js";

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');
const uploadImageBtn = uploadImageForm.querySelector('.img-upload__input');
const closeUploadImageWindowbtn = uploadImageForm.querySelector('.img-upload__cancel');
const textArea = document.querySelector('.text__description');
const hashTags = document.querySelector('.text__hashtags');
const body = document.body;
const uploadContainer = uploadImageForm.querySelector('.img-upload__wrapper');
const re = /[^A-Za-z0-9А-Яа-яЁё]/g;
const MAX_COMMENT_LENGTH = 20;
const MIN_COMMENT_LENGTH = 2;
const HASHTAGS_COUNT = 5;

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
  setDefaultScale();
  isShowModal();
}

function isEscDown(evt) {
  if(isEsc(evt)) {
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

pristine.addValidator(
  hashTags,
  validateTags,
  'Введенные теги не соответствуют формату'
);

function isCommentLength(string) {
  return string.length <= MAX_COMMENT_LENGTH && string.length >= MIN_COMMENT_LENGTH;
}

function isValidSymbols(string) {
  return !re.test(string.slice(1));
}

function startWith(string) {
  return string[0] === '#';
}

function isValidTag(tag) {
  return isCommentLength(tag) && isValidSymbols(tag) && startWith(tag);
}

function hasValidCount(tags) {
  return tags.length <= HASHTAGS_COUNT;
}

function hasUniqueTag(tags) {
  const lowerCaseTags = tags.map(item => item.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
}

function validateTags(value) {
  const tags = value.trim().split(' ').filter(tag => tag.trim().length);

  return hasUniqueTag(tags) && hasValidCount(tags) && tags.every(isValidTag);
}

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
