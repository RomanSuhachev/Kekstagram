import { renderPictures } from './pictureRender.js';

function showErrorMessage() {
  const body = document.querySelector('body');
  const message = document.querySelector('#messages').content.querySelector('.img-upload__message');
  const copyMessage = message.cloneNode(true);
  copyMessage.textContent = 'Не удалось загрузить данные c сервера :(';

  body.append(copyMessage);
}



const getURL = 'https://25.javascript.pages.academy/kekstagram/data';
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

getPhoto();
