exports.$ = document.querySelector.bind(document);

exports.$$ = document.querySelectorAll.bind(document);

exports.animate = ($el, animation) =>
  new Promise(resolve => {
    const removeAnimation = () => {
      $el.classList.remove(animation);
      $el.removeEventListener('animationend', removeAnimation);
      resolve($el);
    };

    $el.classList.add(animation);
    $el.addEventListener('animationend', removeAnimation);
  });

exports.delay = (duration = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, duration);
  });

exports.toggleDisplay = $el => {
  $el.classList.toggle('hidden');
};

exports.genRandomNum = (min = 0, max = 1) =>
  Math.floor(min + Math.random() * (max - min));

exports.getSavedItem = key => {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    if (err instanceof DOMException && err.message.includes('localStorage'))
      return null;
    throw err;
  }
};

exports.saveItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    if (err instanceof DOMException && err.message.includes('localStorage'))
      return false;
    throw err;
  }
};
