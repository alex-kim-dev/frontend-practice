const $overlay = document.querySelector('.overlay');
const $rulesBtn = document.querySelector('.rules');
const $closeModalBtn = document.querySelector('.modal > button');

// animation classes
const FADE_IN = 'fadeIn';
const FADE_OUT = 'fadeOut';

const toggleDisplay = $el => {
  $el.classList.toggle('hidden');
};

const animate = ($el, animation, cb) => {
  const remove = () => {
    $el.classList.remove(animation);
    $el.removeEventListener('animationend', remove);
    if (cb) cb($el);
  };

  $el.classList.add(animation);
  $el.addEventListener('animationend', remove);
};

$rulesBtn.addEventListener('click', () => {
  toggleDisplay($overlay);
  animate($overlay, FADE_IN);
});

$closeModalBtn.addEventListener('click', () => {
  animate($overlay, FADE_OUT, toggleDisplay);
});
