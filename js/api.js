import { renderPictures } from './pictureRender.js';
import { hideUploadImageWindow } from './form.js';
import {getRandomNumber} from './util.js';

const submitBtn = document.querySelector('.img-upload__submit');
const filtersContainer = document.querySelector('.img-filters');
const pictureContainer = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters__form');
const getURL = 'https://25.javascript.pages.academy/kekstagram/data';
const postUrl = 'https://25.javascript.pages.academy/kekstagram';

function addFiltersButtonHandler() {
  filters.addEventListener('click', (e) => {
    const buttons = Array.from(filters.children);

    let elem = e.target;

    if(elem.tagName !== 'BUTTON') return

    buttons.forEach(item => {
      item.classList.remove('img-filters__button--active');

      if(item.classList.contains('img-filters__button--active')) return
    });

    elem.classList.add('img-filters__button--active');
  });
}

const photoSort =  {

  discussed: function() {
    fetch(getURL).then((response) => {
      if(response.ok) {
        return response.json();
      }else {
        throw new Error(`${error.status} - ${error.text}`);
      }
    }).then((data) => {
      let sortArray = data.sort((a,b) => {return b.likes - a.likes});
      return sortArray;
    }).then((array) => {
      const pictures = document.querySelectorAll('.picture');
      pictures.forEach(item => {
        item.remove();
      });
      renderPictures(array);
    }).catch((err) => console.log(err))
  },

  random: function(){
    const photos = document.querySelectorAll('.picture');
    const randomArray = new Set();
    for(let i = 0; i < photos.length; i++) {
      photos[i].classList.add('visually-hidden');
      while(randomArray.size < 10) {
        randomArray.add(photos[getRandomNumber(0, 10)]);
      }
      randomArray.forEach(item => {
        item.classList.remove('visually-hidden');
      });
    }
    return photos;
  },

  default: function() {
    fetch(getURL).then((response) => {
      if(response.ok) {
        return response.json();
      }else {
        throw new Error(`${error.status} - ${error.text}`);
      }
    }).then((data) => {
      const pictures = document.querySelectorAll('.picture');
      pictures.forEach(item => {
        item.remove();
      });
      renderPictures(data);
    }).catch((err) => console.log(err));
  }
};

function changeMode(e) {
  let option = e.target.dataset.filter;
  photoSort[option]();
}

function debounce(callback, timeoutDelay = 500) {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

changeMode = debounce(changeMode, 500);


filtersContainer.addEventListener('click', changeMode);


function showErrorMessage() {
  const body = document.querySelector('body');
  const message = document.querySelector('#messages').content.querySelector('.img-upload__message');
  const copyMessage = message.cloneNode(true);
  copyMessage.textContent = 'Не удалось загрузить данные c сервера :(';

  body.append(copyMessage);
}

function showFiltersControls() {
  filtersContainer.classList.remove('img-filters--inactive');
}

function getPhoto() {
  fetch(getURL).then((response) => {
    if(response.ok) {
      showFiltersControls();
      addFiltersButtonHandler();
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
