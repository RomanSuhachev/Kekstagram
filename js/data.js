import { getRandomArrayElement, getRandomNumber } from './util.js';

const MESSAGE_TEXT = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Petya', 'Denis', 'Alex', 'Shon', 'Keks'];
const DESCRIPTION_PHOTO = ['Nice', 'Very good', 'Beatiful photo', 'Usefull for me', 'How did you do that?']

const comments = Array.from({length: getRandomNumber(1,9)}, (_, index) => createComment(index + 1));

function createComment(index) {
  return {
    id: index,
    avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
    message: `${getRandomArrayElement(MESSAGE_TEXT)}`,
    name: `${getRandomArrayElement(NAMES)}`
  };
}

const arr = Array.from({length: 25}, (_,index) => createProfile(index + 1));

function createProfile(index) {
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: `${getRandomArrayElement(DESCRIPTION_PHOTO)}`,
    likes: getRandomNumber(15,200),
    comments: comments
  };
}

export {arr, comments};
