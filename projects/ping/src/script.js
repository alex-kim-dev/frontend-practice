const subscribeForm = document.querySelector('.subscribe-form');
const emailInput = document.querySelector('.email-field__input');
const feedbackEl = document.querySelector('.subscribe-form__feedback');
const feedbackText = {
  empty: 'Whoops! It looks like you forgot to add your email',
  invalid: 'Please provide a valid email address',
  valid: 'You have been subscribed!',
};

const validate = (formData) => {
  const emailRegExp = /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,}$/;
  const email = formData.get('email').trim();

  if (email === '') return 'empty';
  return emailRegExp.test(email) ? 'valid' : 'invalid';
};

const showFeedback = (status) => {
  feedbackEl.textContent = feedbackText[status];
  if (status === 'valid') {
    emailInput.removeAttribute('aria-invalid');
    subscribeForm.classList.remove('subscribe-form--error');
    subscribeForm.classList.add('subscribe-form--success');
  } else {
    emailInput.setAttribute('aria-invalid', true);
    subscribeForm.classList.remove('subscribe-form--success');
    subscribeForm.classList.add('subscribe-form--error');
    emailInput.focus();
  }
};

const subscribe = (e) => {
  e.preventDefault();
  const formData = new FormData(subscribeForm);
  showFeedback(validate(formData));
};

subscribeForm.addEventListener('submit', subscribe);
