const scaleContainer = document.querySelector('.scale');
const imgPreview = document.querySelector('.img-upload__preview img');
const scaleInput = document.querySelector('.scale__control--value');
const filters = document.querySelector('.effects');
const effectsItems = filters.querySelectorAll('.effects__list .effects__item');

const SCALE_STEP = 0.25;
const DEFAULT_SCALE = 1;
const MIN_SCALE = SCALE_STEP;
let currentScale = 1;

function changeInputValue() {
  scaleInput.value = `${currentScale * 100}%`;
}

const setDefaultScale = (item) => {
  /*
  currentScale = DEFAULT_SCALE;
  imgPreview.style.transform = `scale(${currentScale})`;*/

  item.removeAttribute("style");
};

function removeFilters(item) {
  item.removeAttribute("class");
}

class Scale {
  constructor(elem) {
    this.elem = elem;
    elem.onclick = this.onClick.bind(this);
  }

  zoomOut() {
    if(currentScale === MIN_SCALE) {return};
    currentScale -= SCALE_STEP;
    imgPreview.style.transform = `scale(${currentScale})`;
    changeInputValue();
  }

  zoomIn() {
    if(currentScale === DEFAULT_SCALE) {return};
    currentScale += SCALE_STEP;
    imgPreview.style.transform = `scale(${currentScale})`;
    changeInputValue();
  }

  onClick(e) {
    let action = e.target.dataset.action;
    if(action) {
      this[action]();
    }
  }
}

new Scale(scaleContainer);


// apply effects

function setEffect (effect) {
  effectsItems.forEach(item => {
    item.className = "";
  });
  imgPreview.className= `effects__preview--${effect}`;
};

class Filters {
  constructor(elem) {
    this.elem = elem;
    elem.onchange = this.onChange.bind(this);
  }

  original() {
    setEffect("");
  }

  chrome() {
    setEffect("chrome");
  }

  sepia() {
    setEffect("sepia");
  }

  marvin() {
    setEffect("marvin");
  }

  phobos() {
    setEffect("phobos");
  }

  heat() {
    setEffect("heat");
  }

  onChange(e) {
    let filter = e.target.dataset.filter;
    if(filter) {
      this[filter]();
    }
  }
}

new Filters(filters);

//reset effects

function resetEffects() {
  setDefaultScale(imgPreview);
  removeFilters(imgPreview);
}

export {resetEffects};
