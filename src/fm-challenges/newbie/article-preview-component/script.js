const $shareBtn = document.getElementById('share');
const $shareUi = document.querySelector('.share');

const toggleShareUi = () => {
  $shareUi.classList.toggle('hidden');
  $shareBtn.classList.toggle('inverse');
};

const hideShareUiOnClickAway = ({ target }) => {
  if (
    !target.closest('.share, #share') &&
    !$shareUi.classList.contains('hidden')
  )
    toggleShareUi();
};

$shareBtn.addEventListener('click', toggleShareUi);
document.addEventListener('click', hideShareUiOnClickAway);
