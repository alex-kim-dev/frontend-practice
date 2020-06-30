const $shareBtn = document.getElementById('share');
const $shareUI = document.querySelector('.share');

const toggleShareUI = () => {
  $shareUI.classList.toggle('hidden');
  $shareBtn.classList.toggle('inverse');
};

$shareBtn.addEventListener('click', toggleShareUI);
