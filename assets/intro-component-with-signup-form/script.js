/* eslint-disable no-param-reassign */

'use strict';

(() => {
  const run = () => {
    const signupForm = document.querySelector('.signupForm');
    const fields = [...signupForm.querySelectorAll('.field')].map(field => ({
      field,
      input: field.querySelector('.textInput_input'),
      feedback: field.querySelector('.field_feedback'),
    }));

    const checkEmpty = ({ value, placeholder }) =>
      value.trim() === '' ? `${placeholder} cannot be empty` : '';

    const checkEmail = ({ value }) => {
      const emailRegExp = /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,}$/;
      return emailRegExp.test(value.trim())
        ? ''
        : 'Looks like this is not an email';
    };

    const inputChecks = {
      firstName: [checkEmpty],
      lastName: [checkEmpty],
      email: [checkEmpty, checkEmail],
      password: [checkEmpty],
    };

    const showFeedback = ({ input, field, feedback, error }) => {
      feedback.textContent = error;
      field.classList.add('field-error');
      input.setAttribute('aria-invalid', true);
    };

    const hideFeedback = ({ input, field, feedback }) => {
      feedback.textContent = '';
      field.classList.remove('field-error');
      input.removeAttribute('aria-invalid');
    };

    const validate = field => {
      const { input } = field;
      const error =
        inputChecks[input.name]
          .map(check => check(input))
          .find(errorMsg => errorMsg !== '') || null;
      return { ...field, error };
    };

    const updateUi = field => {
      if (field.error) {
        showFeedback(field);
      } else {
        hideFeedback(field);
      }
      return field;
    };

    const hasErrors = ({ error }) => Boolean(error);

    const signup = e => {
      e.preventDefault();

      const invalidFields = fields
        .map(validate)
        .map(updateUi)
        .filter(hasErrors);

      if (invalidFields.length === 0) {
        // eslint-disable-next-line no-console
        console.log('Signup form validation passed.');
        // send data to backend, handle response
      } else invalidFields[0].input.focus();
    };

    signupForm.addEventListener('submit', signup);
  };

  if (document.readyState !== 'loading') run();
  else window.addEventListener('DOMContentLoaded', run);
})();
