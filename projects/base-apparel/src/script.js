const run = () => {
  const subscribeForm = document.querySelector('.subscribe');
  const emailInput = document.querySelector('.subscribe__email');
  const feedback = document.querySelector('.subscribe__feedback');

  const transitionTime = 300;

  const isEmailValid = (str) =>
    str.trim().match(/^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,}$/);

  const showFeedback = () => {
    if (isEmailValid(emailInput.value)) {
      feedback.textContent = 'You have been subscribed';
      subscribeForm.classList.add('subscribe--success');
    } else {
      feedback.textContent = 'Please provide a valid email';
      subscribeForm.classList.add('subscribe--error');
    }
  };

  const subscribe = (e) => {
    e.preventDefault();
    if (subscribeForm.className.match(/subscribe--(success)|(error)/)) {
      subscribeForm.classList.remove('subscribe--success', 'subscribe--error');
      setTimeout(showFeedback, transitionTime);
    } else showFeedback();
  };

  subscribeForm.addEventListener('submit', subscribe);
};

document.addEventListener('DOMContentLoaded', run);
