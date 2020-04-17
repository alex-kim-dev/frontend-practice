'use strict';

(() => {
  const run = () => {
    const transitionTime = 300;
    const subscribeForm = document.querySelector('.subscribe');
    const emailInput = document.querySelector('.subscribe_email');
    const feedbackEl = document.querySelector('.subscribe_feedback');

    const isValidEmail = str =>
      str.trim().match(/^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,}$/);

    const showFeedback = () => {
      if (isValidEmail(emailInput.value)) {
        feedbackEl.textContent = 'You have been subscribed';
        subscribeForm.classList.add('subscribe-success');
      } else {
        feedbackEl.textContent = 'Please provide a valid email';
        subscribeForm.classList.add('subscribe-error');
      }
    };

    const subscribe = e => {
      e.preventDefault();
      if (subscribeForm.className.match(/subscribe-(success)|(error)/)) {
        subscribeForm.classList.remove('subscribe-success', 'subscribe-error');
        setTimeout(showFeedback, transitionTime);
      } else showFeedback();
    };

    subscribeForm.addEventListener('submit', subscribe);
  };

  if (document.readyState !== 'loading') run();
  else window.addEventListener('DOMContentLoaded', run);
})();
