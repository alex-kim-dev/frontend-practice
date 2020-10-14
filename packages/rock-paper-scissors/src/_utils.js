export const $ = document.querySelector.bind(document);

export const $$ = document.querySelectorAll.bind(document);

export const animate = ($el, animation) =>
  new Promise((resolve) => {
    const removeAnimation = () => {
      $el.classList.remove(animation);
      $el.removeEventListener('animationend', removeAnimation);
      resolve($el);
    };

    $el.classList.add(animation);
    $el.addEventListener('animationend', removeAnimation);
  });

export const delay = (duration = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

export const toggleDisplay = ($el) => {
  $el.classList.toggle('hidden');
};

export const genRandomNum = (min = 0, max = 1) =>
  Math.floor(min + Math.random() * (max - min));

export const getSavedItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    if (err instanceof DOMException && err.message.includes('localStorage'))
      return null;
    throw err;
  }
};

export const saveItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    if (err instanceof DOMException && err.message.includes('localStorage'))
      return false;
    throw err;
  }
};
