/* eslint-disable no-underscore-dangle */

import './style.css';

const pricingData = [
  { views: 1e4, price: 8 },
  { views: 5e4, price: 12 },
  { views: 1e5, price: 16 },
  { views: 5e5, price: 24 },
  { views: 1e6, price: 36 },
];

const sliderPositionMin = 0;
const sliderPositionMax = pricingData.length - 1;

const state = {
  _sliderPosition: Math.floor(sliderPositionMax / 2),

  get sliderPosition() {
    return this._sliderPosition;
  },

  set sliderPosition(position) {
    this._sliderPosition = Math.min(
      Math.max(position, sliderPositionMin),
      sliderPositionMax,
    );
  },
};

const $pricingWidget = document.getElementById('pricing-widget');
const $slider = $pricingWidget.querySelector('.slider');
const $bar = $pricingWidget.querySelector('.slider__bar');
const $thumb = $pricingWidget.querySelector('.slider__thumb');
const $views = $pricingWidget.querySelector('.pricing__views');
const $value = $pricingWidget.querySelector('.pricing__value');

/** @arg {number} option */
const updatePricing = (option) => {
  const { price, views } = pricingData[option];
  const viewsText = `${views} pageviews`;

  $views.textContent = viewsText;
  $value.textContent = price;

  $slider.style.setProperty('--position', option);
  $thumb.setAttribute('aria-valuenow', views);
  $thumb.setAttribute('aria-valuetext', viewsText);
};

/** @arg {KeyboardEvent} event */
const handleSliderKeyDown = (event) => {
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      state.sliderPosition -= 1;
      break;
    case 'ArrowRight':
    case 'ArrowUp':
      state.sliderPosition += 1;
      break;
    case 'Home':
      state.sliderPosition = sliderPositionMin;
      break;
    case 'End':
      state.sliderPosition = sliderPositionMax;
      break;
    case 'PageUp':
      state.sliderPosition += 2;
      break;
    case 'PageDown':
      state.sliderPosition -= 2;
      break;
    default:
      break;
  }

  updatePricing(state.sliderPosition);
};

/** @arg {MouseEvent} event */
const handleSliderClick = (event) => {
  $thumb.focus();

  state.sliderPosition = Math.round(
    (event.offsetX / $bar.clientWidth) * sliderPositionMax,
  );

  updatePricing(state.sliderPosition);
};

$thumb.addEventListener('keydown', handleSliderKeyDown);
$bar.addEventListener('click', handleSliderClick);
