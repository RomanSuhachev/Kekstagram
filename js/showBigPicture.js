
const bigPictureContainer = document.querySelector('.big-picture');
const commentsCount = document.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social__comments');
const closeBigImageBtn = document.querySelector('.big-picture__cancel');
const commentLoader = document.querySelector('.social__comments-loader');


function createComment({id,avatar,message,name}) {
  const comment = document.createElement('li');
  comment.classList.add('social__comment')

  comment.innerHTML = `<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
  <p class="social__text">${message}</p>`;

  return comment;
}

function renderComments(comments) {
  commentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();

  comments.forEach(comment => {
    const newComment = createComment(comment);
    fragment.append(newComment);
  });

  commentsList.append(fragment);
};

function closeBigImage() {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigImage();
  }
}

function renderPictureInfo({url, likes, description}) {
  bigPictureContainer.querySelector('.big-picture__img img').src = url;
  bigPictureContainer.querySelector('.big-picture__img img').alt = description;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.social__caption').textContent = description;
}

function showBigImage(picture) {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);

  renderPictureInfo(picture);
  renderComments(picture.comments);
}

closeBigImageBtn.addEventListener('click', closeBigImage);

export {showBigImage}
