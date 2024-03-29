function getRandomNumber (min,max) {
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.ceil(Math.max(Math.abs(min), Math.abs(max)));

  if(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  throw('Аргументы должны быть заданы!');
}

function getRandomArrayElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function getStringLength(string, maxLength) {

  return string.length > maxLength ? false : true;

}

function isEsc(e) {
  return e.key === 'Escape';
}

export {getRandomArrayElement, getRandomNumber, isEsc};
