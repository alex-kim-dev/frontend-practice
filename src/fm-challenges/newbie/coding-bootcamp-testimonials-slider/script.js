const $testimonials = document.querySelector('.testimonials');
const $photo = $testimonials.querySelector('.photo');
const $quote = $testimonials.querySelector('.quote > p');
const $cite = $testimonials.querySelector('.quote > footer');
const $author = $testimonials.querySelector('.quote > footer > cite');
const $position = $testimonials.querySelector(
  '.quote > footer > cite:nth-child(2)',
);

const elementsToAnimate = [$photo, $quote, $cite];
const factor = { prev: -1, next: 1 };
const animations = {
  hide: {
    prev: 'hide-reverse',
    next: 'hide',
  },
  show: {
    prev: 'show-reverse',
    next: 'show',
  },
};

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

const createImage = (url, alt) => {
  const $img = new Image();
  $img.src = url;
  $img.alt = alt;
  return $img;
};

const animate = (elements, animationClass) =>
  new Promise(resolve => {
    const removeAnimation = () => {
      elements.forEach(element => {
        element.classList.remove(animationClass);
      });
      elements[0].removeEventListener('animationend', removeAnimation);
      resolve();
    };

    elements.forEach(element => {
      element.classList.add(animationClass);
    });
    elements[0].addEventListener('animationend', removeAnimation);
  });

const updateContent = testimonial => {
  $photo.firstElementChild.replaceWith(testimonial.$photo);
  $quote.textContent = testimonial.quote;
  $author.textContent = testimonial.author;
  $position.textContent = testimonial.position;
};

const changeSlide = testimonials => ({ target: btn }) => {
  btn.setAttribute('disabled', true);
  const direction = btn.dataset.slide;

  currentSlide =
    Math.abs(currentSlide + factor[direction]) % testimonials.length;

  animate(elementsToAnimate, animations.hide[direction])
    .then(() => updateContent(testimonials[currentSlide]))
    .then(() => animate(elementsToAnimate, animations.show[direction]))
    .then(() => btn.removeAttribute('disabled'));
};

(async () => {
  const data = await getData('data.json');
  if (!data) return;

  const testimonials = data.testimonials.map(testimonial => ({
    ...testimonial,
    $photo: createImage(
      testimonial.photoUrl,
      `Member photo - ${testimonial.author}`,
    ),
  }));

  document
    .querySelectorAll('[data-slide]')
    .forEach(btn => btn.addEventListener('click', changeSlide(testimonials)));
})();
