const scaleContainer = document.querySelector('.scale');
const imgPreview = document.querySelector('.img-upload__preview img');
const bigger = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

const SCALE_STEP = 0.25;
const DEFAULT_SCALE = 1;
const MIN_SCALE = SCALE_STEP;
let currentScale = 1;

function changeInputValue() {
  scaleInput.value = `${currentScale * 100}%`;
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
