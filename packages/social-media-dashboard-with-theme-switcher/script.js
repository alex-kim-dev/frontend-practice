document
  .querySelector('input[type="checkbox"]')
  .addEventListener('click', ({ target }) => {
    if (target.checked) document.body.setAttribute('theme', 'dark');
    else document.body.removeAttribute('theme');
  });
