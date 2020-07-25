const { $, $$, animate, toggleDisplay, genRandomNum } = require('./_utils');

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

// ---

const $playField = $('.playField');
const $result = $('.result');
const $leftCol = $('.result > .col:nth-child(1) > .box');
const $rightCol = $('.result > .col:nth-child(2) > .box');
const $status = $('.status');
const $score = $('.score > div:nth-child(2)');

let score = 0;

const newOptionElement = className => {
  const $option = document.createElement('div');
  $option.classList.add('option', className);

  const $spanWithIcon = $(`button.option.${className} > span`).cloneNode(true);
  $option.append($spanWithIcon);

  return $option;
};

// 'beats' contains indexes of the options
const options = [
  { name: 'Scissors', beats: [1, 3] },
  { name: 'Paper', beats: [2, 4] },
  { name: 'Rock', beats: [3, 0] },
  { name: 'Lizard', beats: [4, 1] },
  { name: 'Spock', beats: [0, 2] },
].map(opt => ({
  ...opt,
  $element: newOptionElement(opt.name.toLowerCase()),
}));

const render = (playerPick, housePick, isPlayerWon) => {
  $leftCol.append(options[playerPick].$element);
  toggleDisplay($playField);
  toggleDisplay($result);

  $rightCol.append(options[housePick].$element);

  $status.textContent = isPlayerWon ? 'You win' : 'You lose';
  $result.classList.add('expanded');

  $score.textContent = score;
};

const play = ({ currentTarget }) => {
  const clickedOptName = currentTarget.getAttribute('aria-label');
  const playerPick = options.findIndex(({ name }) => name === clickedOptName);

  const random = genRandomNum(0, options.length - 1);
  const housePick = options
    .map((_, i) => i) // saving initial indexes
    // filtering out the option already picked by a player
    // & picking a random option from the rest
    .filter((_, i) => i !== playerPick)[random];

  const isPlayerWon = options[playerPick].beats.includes(housePick);

  score += isPlayerWon ? 1 : -1;

  render(playerPick, housePick, isPlayerWon);
};

const newRound = () => {
  toggleDisplay($playField);
  toggleDisplay($result);
  $result.classList.remove('expanded');
  $leftCol.removeChild($leftCol.lastElementChild);
  $rightCol.removeChild($rightCol.lastElementChild);
};

$$('.playField .option').forEach($option => {
  $option.addEventListener('click', play);
});

$('.repeat').addEventListener('click', newRound);
