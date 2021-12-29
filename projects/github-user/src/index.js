import './style.css';

const $switch = document.querySelector('.theme-switch');

let isDark = false;

$switch.addEventListener('click', () => {
  if (isDark) document.body.removeAttribute('data-theme');
  else document.body.setAttribute('data-theme', 'dark');
  $switch.setAttribute('aria-checked', !isDark);
  isDark = !isDark;
});
