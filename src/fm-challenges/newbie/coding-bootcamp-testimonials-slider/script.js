const $testimonials = document.querySelector('.testimonials');
const $quote = $testimonials.querySelector('.quote > p');
const $photo = $testimonials.querySelector('.slide > img');
const $author = $testimonials.querySelector('.quote > footer > cite');
const $position = $testimonials.querySelector(
  '.quote > footer > cite:nth-child(2)',
);

const factor = { prev: -1, next: 1 };

let currentSlide = 0;

const getData = async url => {
  try {
    const data = await fetch(url);
    return await data.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('An error occur while getting data:\n', err);
    return null;
  }
};

const preloadImage = url => {
  new Image().src = url;
};

const changeSlide = ({ testimonials }) => ({ target }) => {
  const direction = target.dataset.slide;

  currentSlide =
    Math.abs(currentSlide + factor[direction]) % testimonials.length;

  $quote.textContent = testimonials[currentSlide].quote;
  $photo.setAttribute('src', testimonials[currentSlide].photoUrl);
  $author.textContent = testimonials[currentSlide].author;
  $position.textContent = testimonials[currentSlide].position;
};

(async () => {
  const data = await getData('data.json');
  if (!data) return;

  data.testimonials.forEach(({ photoUrl }) => preloadImage(photoUrl));

  document
    .querySelectorAll('[data-slide]')
    .forEach(btn => btn.addEventListener('click', changeSlide(data)));
})();
