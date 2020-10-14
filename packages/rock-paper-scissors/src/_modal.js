const { $, animate, toggleDisplay } = require('./_utils');

const $overlay = $('.overlay');
const $rulesBtn = $('.rules');
const $closeModalBtn = $('.modal > button');

const hideModal = (event) => {
  event.stopPropagation();
  const { target } = event;

  if (target === $overlay || $closeModalBtn.contains(target)) {
    animate($overlay, 'fadeOut').then(toggleDisplay);
  }
};

const showModal = () => {
  toggleDisplay($overlay);
  animate($overlay, 'fadeIn');
};

$closeModalBtn.addEventListener('click', hideModal, true);
$overlay.addEventListener('click', hideModal, true);
$rulesBtn.addEventListener('click', showModal);
