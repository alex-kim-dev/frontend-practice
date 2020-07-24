const { $, animate, toggleDisplay } = require('./_utils');

const $overlay = $('.overlay');
const $rulesBtn = $('.rules');
const $closeModalBtn = $('.modal > button');

// animation classes
const FADE_IN = 'fadeIn';
const FADE_OUT = 'fadeOut';

const hideModal = event => {
  event.stopPropagation();
  const { target } = event;

  if (target === $overlay || $closeModalBtn.contains(target)) {
    animate($overlay, FADE_OUT).then(toggleDisplay);
  }
};

const showModal = () => {
  toggleDisplay($overlay);
  animate($overlay, FADE_IN);
};

$closeModalBtn.addEventListener('click', hideModal, true);
$overlay.addEventListener('click', hideModal, true);
$rulesBtn.addEventListener('click', showModal);
