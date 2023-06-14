import { renderPictures } from './pictureRender.js';
import { hideUploadImageWindow } from './form.js';

const submitBtn = document.querySelector('.img-upload__submit');

function showErrorMessage() {
  const body = document.querySeelctor('body');
  const message = document.querySelector('#messages').content.querySelector('.img-upload__message');
  const copyMessage = message.cloneNode(true);
  copyMessage.textContent = 'Не удалось загрузить данные c сервера :(';

  body.append(copyMessage);
}



const getURL = 'https://25.javascript.pages.academy/kekstagram/data';
const postUrl = 'https://25.javascript.pages.academy/kekstagram';
function getPhoto() {
  fetch(getURL).then((response) => {
    if(response.ok) {
      return response.json();
    }else {
      throw new Error(`${response.status} : ${response.text}`);
    }
  }).then((items) => renderPictures(items))
    .catch((error => showErrorMessage()));
}

function sendForm(onsuccess,onerror,e) {
  toggleSubmitBtn(true, 'Отправляем данные');
  const data = new FormData(e.target);
  fetch(postUrl, {
    method: 'POST',
    body: data
  }).then((response) => {
    if(response.ok) {
      onsuccess();
      e.target.reset();
      setTimeout(hideUploadImageWindow,3000);
    }else {
      onerror();
    }
  }).catch((error) => {
    setTimeout(errorSend, 3000);
    toggleSubmitBtn(true, 'Ошибка отправки данных');
    // console.log(error);
  });
};


function toggleSubmitBtn(bool, text) {
  submitBtn.disabled = bool;
  submitBtn.textContent = text;

}

function errorSend() {
  submitBtn.textContent = 'Повторить';
  submitBtn.disabled = false;
}
getPhoto();

export {sendForm}
