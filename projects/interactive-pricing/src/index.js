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

const $pricingWidget = document.getElementById('pricing-widget');
const $slider = $pricingWidget.querySelector('.slider');
const $bar = $pricingWidget.querySelector('.slider__bar');
const $thumb = $pricingWidget.querySelector('.slider__thumb');
const $views = $pricingWidget.querySelector('.pricing__views');
const $value = $pricingWidget.querySelector('.pricing__value');

const priceFormatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const viewsFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
});

/** @arg {number} option */
function updatePricing(option) {
  const { price, views } = pricingData[option];
  const viewsText = viewsFormatter.format(views).concat(' pageviews');

  $views.textContent = viewsText;
  $value.textContent = priceFormatter.format(price);

  $slider.style.setProperty('--position', option);
  $thumb.setAttribute('aria-valuenow', views);
  $thumb.setAttribute('aria-valuetext', viewsText);
}

const state = new Proxy(
  { sliderPosition: Math.floor(sliderPositionMax / 2) },
  {
    set: (container, prop, value) => {
      switch (prop) {
        case 'sliderPosition': {
          const position = Math.min(
            Math.max(value, sliderPositionMin),
            sliderPositionMax,
          );
          if (container[prop] !== position) {
            container[prop] = position;
            updatePricing(position);
          }
          return true;
        }

        default: {
          container[prop] = value;
          return true;
        }
      }
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

/** @arg {MouseEvent} event */
const handleSliderDrag = (event) => {
  event.preventDefault();
  event.stopPropagation();
  $thumb.focus();
  document.body.classList.add('dragging');

  /** @arg {MouseEvent} event */
  const handleMouseMove = ({ pageX }) => {
    const { left, width } = $bar.getBoundingClientRect();
    state.sliderPosition = Math.round(
      ((pageX - left) / width) * sliderPositionMax,
    );
  };

  const handleMouseUp = () => {
    document.body.classList.remove('dragging');
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

/** @arg {MouseEvent} event */
const handleSliderClick = (event) => {
  $thumb.focus();

  state.sliderPosition = Math.round(
    (event.offsetX / $bar.clientWidth) * sliderPositionMax,
  );
};

$thumb.addEventListener('keydown', handleSliderKeyDown);
$thumb.addEventListener('mousedown', handleSliderDrag);
$bar.addEventListener('click', handleSliderClick);

// FIXME take the thumb width in account when calculating a new position
