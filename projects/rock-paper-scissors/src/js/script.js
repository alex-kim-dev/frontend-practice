import './_modal';
import {
  $,
  $$,
  animate,
  delay,
  toggleDisplay,
  genRandomNum,
  getSavedItem,
  saveItem,
} from './_utils';

const $playField = $('.playfield');
const $result = $('.result');
const $leftCol = $('.result > .col:nth-child(1) > .box');
const $rightCol = $('.result > .col:nth-child(2) > .box');
const $status = $('.status');
const $score = $('.score > div:nth-child(2)');
const $center = $('.center');

const savedScore = getSavedItem('score');
if (savedScore === null)
  // eslint-disable-next-line no-console
  console.warn(
    "The score won't be saved between sessions as third party cookies are disabled in your browser.",
  );

let score = Number(savedScore) || 0;
let isGameInProgress = false;

$score.textContent = score;

const newOptionElement = (className) => {
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
].map((opt) => ({
  ...opt,
  $element: newOptionElement(opt.name.toLowerCase()),
}));

const render = async (playerPick, housePick, isPlayerWon) => {
  $leftCol.append(options[playerPick].$element);
  await animate($playField, 'fadeOut');
  toggleDisplay($playField);
  await delay(300);

  toggleDisplay($result);
  await animate($result, 'fadeIn');
  await delay(800);

  $rightCol.append(options[housePick].$element);
  await animate(options[housePick].$element, 'flip');
  await delay(500);

  (isPlayerWon ? $leftCol : $rightCol).classList.add('highlight');
  await delay(1000);

  $status.textContent = isPlayerWon ? 'You win' : 'You lose';
  $result.classList.add('expanded');
  await animate($center, 'expand');

  animate($score, 'flip-scale');
  await delay(300);
  $score.textContent = score;
};

const play = ({ currentTarget }) => {
  if (isGameInProgress) return;
  isGameInProgress = true;

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
  saveItem('score', score);

  render(playerPick, housePick, isPlayerWon);
};

const newRound = async () => {
  if (!isGameInProgress) return;
  isGameInProgress = false;

  await animate($result, 'fadeOut');
  toggleDisplay($result);

  toggleDisplay($playField);
  animate($playField, 'fadeIn');

  $('.highlight').classList.remove('highlight');

  $result.classList.remove('expanded');

  $leftCol.removeChild($leftCol.lastElementChild);
  $rightCol.removeChild($rightCol.lastElementChild);

  isGameInProgress = false;
};

$$('.playfield .option').forEach(($option) => {
  $option.addEventListener('click', play);
});

$('.repeat').addEventListener('click', newRound);
