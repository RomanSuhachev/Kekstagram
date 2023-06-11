const effectValue = document.querySelector('.effect-level__value');
const scaleContainer = document.querySelector('.scale');
const imgPreview = document.querySelector('.img-upload__preview img');
const scaleInput = document.querySelector('.scale__control--value');
const filters = document.querySelector('.effects');
const effectsItems = filters.querySelectorAll('.effects__list .effects__item');
const effectDegree = document.querySelector('.effect-level__slider');

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
  imgPreview.className= `effects__preview--${effect}`;
};

noUiSlider.create(effectDegree, {
  start: 1,
  step: 0.1,
  range: {
    'min': 0,
    'max': 1
  }
});

class Filters {
  constructor(elem) {
    this.elem = elem;
    elem.onchange = this.onChange.bind(this);
  }

  original(value) {
    setEffect("");
    return 'none';
  }

  chrome(value) {
    setEffect("chrome");
    return `grayscale(${value})`;
  }

  sepia(value) {
    setEffect("sepia");
    return `sepia(${value})`;
  }

  marvin(value) {
    setEffect("marvin");
    return `invert(${value}%)`;
  }

  phobos(value) {
    setEffect("phobos");
    return `blur(${value}px)`;
  }

  heat(value) {
    setEffect("heat");
    return `brightness(${value})`;
  }

  onChange(e) {
    let filter = e.target.dataset.filter;
    if(filter) {
      this.setFilterDegree(filter);
      imgPreview.style.filter = this[filter]();
    }

    switch(filter) {
      case ('marvin'):
        effectDegree.noUiSlider.updateOptions({
          range: {
            'min': 0,
            'max': 100
          },
          start: 100,
          step: 1
        });
        break;
      case ('phobos'):
        effectDegree.noUiSlider.updateOptions({
          range: {
            'min': 0,
            'max': 3
          },
          start: 3,
          step: 0.1
        });
        break;
      case ('heat'):
        effectDegree.noUiSlider.updateOptions({
          range: {
            'min': 1,
            'max': 3
          },
          start: 3,
          step: 0.1
        });
        break;
    }
  }

  setFilterDegree(filter) {
    effectDegree.noUiSlider.on('update', () => {
      effectValue.value = effectDegree.noUiSlider.get();
      imgPreview.style.filter = this[filter](effectValue.value);
    });
  }
};

let filtersClass = new Filters(filters);

//reset effects

function resetEffects() {
  setDefaultScale(imgPreview);
  removeFilters(imgPreview);
}

export {resetEffects,filtersClass};
