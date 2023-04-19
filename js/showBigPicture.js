
const bigPictureContainer = document.querySelector('.big-picture');
const commentsCount = document.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social__comments');
const closeBigImageBtn = document.querySelector('.big-picture__cancel');
const commentLoader = document.querySelector('.social__comments-loader');
let commentCount = 5;
let commentPortion = commentCount;

function createComment({id,avatar,message,name}) {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  comment.innerHTML = `<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
  <p class="social__text">${message}</p>`;

  return comment;
}

function renderComments(comments) {

  commentsList.innerHTML = '';
  commentLoader.classList.remove('hidden');

  const fragment = document.createDocumentFragment();

  for (let i = 0; i <= comments.length - 1; i++) {
    const newComment = createComment(comments[i]);
    newComment.classList.add('hidden');

    if(i <= commentCount - 1) {
      newComment.classList.remove('hidden');
    };
    fragment.append(newComment);
  }

  commentsList.append(fragment);
};

function showMoreComments() {
  const commentsArray = Array.from(commentsList.querySelectorAll('.social__comment'));
  commentPortion += commentCount;

  console.log(commentPortion);

  for (let i = 0; i <= commentsArray.length - 1; i++) {
    if(i <= commentPortion - 1) {
      commentsArray[i].classList.remove('hidden');
    }

    if (commentPortion >= commentsArray.length) {
      commentLoader.classList.add('hidden');
    }
};
};

function closeBigImage() {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  commentLoader.removeEventListener('click', showMoreComments);
  commentPortion = commentCount;
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
  commentLoader.addEventListener('click', showMoreComments);
}

closeBigImageBtn.addEventListener('click', closeBigImage);

export {showBigImage}
