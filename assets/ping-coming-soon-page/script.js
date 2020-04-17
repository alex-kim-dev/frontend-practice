'use strict';

(() => {
  const run = () => {
    const subscribeForm = document.querySelector('.subscribeForm');
    const emailInput = document.querySelector('.emailField_input');
    const feedbackEl = document.querySelector('.subscribeForm_feedback');
    const feedbackText = {
      empty: 'Whoops! It looks like you forgot to add your email',
      invalid: 'Please provide a valid email address',
      valid: 'You have been subscribed!',
    };

    const validate = formData => {
      const emailRegExp = /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,}$/;
      const email = formData.get('email').trim();

      if (email === '') return 'empty';
      return emailRegExp.test(email) ? 'valid' : 'invalid';
    };

    const showFeedback = status => {
      feedbackEl.textContent = feedbackText[status];
      if (status === 'valid') {
        emailInput.removeAttribute('aria-invalid');
        subscribeForm.classList.remove('subscribeForm-error');
        subscribeForm.classList.add('subscribeForm-success');
      } else {
        emailInput.setAttribute('aria-invalid', true);
        subscribeForm.classList.remove('subscribeForm-success');
        subscribeForm.classList.add('subscribeForm-error');
        emailInput.focus();
      }
    };

    const subscribe = e => {
      e.preventDefault();
      const formData = new FormData(subscribeForm);
      showFeedback(validate(formData));
    };

    subscribeForm.addEventListener('submit', subscribe);
  };

  if (document.readyState !== 'loading') run();
  else window.addEventListener('DOMContentLoaded', run);
})();
