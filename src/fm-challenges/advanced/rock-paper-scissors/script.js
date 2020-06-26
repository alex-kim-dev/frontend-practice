const $overlay = document.querySelector('.overlay');
const $rulesBtn = document.querySelector('.rules');
const $closeModalBtn = document.querySelector('.modal > button');

const toggleModal = () => {
  $overlay.classList.toggle('hidden');
};

[$rulesBtn, $closeModalBtn].forEach(btn =>
  btn.addEventListener('click', toggleModal),
);
