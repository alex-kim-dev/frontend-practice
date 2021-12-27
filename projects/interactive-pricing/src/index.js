import './style.css';

const pricingData = [
  { views: 1e4, price: 8 },
  { views: 5e4, price: 12 },
  { views: 1e5, price: 16 },
  { views: 5e5, price: 24 },
  { views: 1e6, price: 36 },
];
/** Yearly discount in percent */
const discount = 25;

const sliderPositionMin = 0;
const sliderPositionMax = pricingData.length - 1;

const $pricingWidget = document.getElementById('pricing-widget');
const $slider = $pricingWidget.querySelector('.slider');
const $bar = $pricingWidget.querySelector('.slider__bar');
const $thumb = $pricingWidget.querySelector('.slider__thumb');
const $views = $pricingWidget.querySelector('.pricing__views');
const $value = $pricingWidget.querySelector('.pricing__value');
const $switch = $pricingWidget.querySelector('.switch__checkbox');

/**
 * Calculates the slider's thumb position, taking into account that the thumb moves within a range of the bar width minus the thumb width.
 * @arg {number} offset X coordinate relative to the left edge of the slider
 */
const getSliderPosition = (offset) =>
  Math.round(
    ((offset - $thumb.clientWidth / 2) /
      ($bar.clientWidth - $thumb.clientWidth)) *
      sliderPositionMax,
  );

const priceFormatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const viewsFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
});

/** @arg {{ sliderPosition: number, yearlyBilling: boolean }} state */
const render = ({ sliderPosition, yearlyBilling }) => {
  const { price, views } = pricingData[sliderPosition];
  const viewsText = viewsFormatter.format(views).concat(' pageviews');

  $views.textContent = viewsText;
  $value.textContent = priceFormatter.format(
    price * (yearlyBilling ? 1 - discount / 100 : 1),
  );

  $slider.style.setProperty('--position', sliderPosition);
  $thumb.setAttribute('aria-valuenow', views);
  $thumb.setAttribute('aria-valuetext', viewsText);
  $switch.setAttribute('aria-checked', yearlyBilling);
};

const state = new Proxy(
  Object.seal({
    sliderPosition: Math.floor(sliderPositionMax / 2),
    yearlyBilling: false,
  }),
  {
    set: (container, prop, value, proxy) => {
      switch (prop) {
        case 'sliderPosition': {
          const position = Math.min(
            Math.max(value, sliderPositionMin),
            sliderPositionMax,
          );
          if (container[prop] !== position) {
            container[prop] = position;
            render(proxy);
          }
          break;
        }

        case 'yearlyBilling': {
          if (container[prop] !== value) {
            container[prop] = value;
            render(proxy);
          }
          break;
        }

        // no default
      }

      return true;
    },
  },
);

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
};

const handleSliderDrag = (e) => {
  e.preventDefault();
  e.stopPropagation();
  $thumb.focus();
  document.body.classList.add('dragging');

  /** @arg {MouseEvent | TouchEvent} event */
  const handleMouseMove = (event) => {
    const { pageX } = event instanceof MouseEvent ? event : event.touches[0];
    const { left } = $bar.getBoundingClientRect();
    state.sliderPosition = getSliderPosition(pageX - left);
  };

  const handleMouseUp = () => {
    document.body.classList.remove('dragging');
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchend', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('touchend', handleMouseUp);
};

/** @arg {MouseEvent} event */
const handleSliderClick = ({ offsetX }) => {
  $thumb.focus();
  state.sliderPosition = getSliderPosition(offsetX);
};

/** @arg {Event} event */
const handleSwitchChange = (event) => {
  state.yearlyBilling = event.currentTarget.checked;
};

$thumb.addEventListener('keydown', handleSliderKeyDown);
$thumb.addEventListener('mousedown', handleSliderDrag);
$thumb.addEventListener('touchstart', handleSliderDrag);
$bar.addEventListener('click', handleSliderClick);
$switch.addEventListener('change', handleSwitchChange);
