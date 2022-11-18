const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let inputText = '';
let timeintervalId = 0;
let isLaunched = false;

const createTimerAnimator = () => {
  return (seconds) => {
    let timerTime = seconds;
    renderTimer(timerTime);
    timeintervalId = setInterval(() => {
      timerTime--;
      renderTimer(timerTime);
      if (+timerTime <= 0) stopTimer();
    }, 1000);
  };
};
const animateTimer = createTimerAnimator();

const renderTimer = (timerTime) => {
  timerEl.innerHTML = getRenderTemplate(timerTime);
}

const getFullTime = (inputSeconds) => ({
  hours: getDoubleNumberString(inputSeconds / 60 / 60 % 60),
  minutes: getDoubleNumberString(inputSeconds / 60 % 60),
  seconds: getDoubleNumberString(inputSeconds % 60),
});

const getDoubleNumberString = (num) => String(Math.floor(num)).padStart(2, '0');

const getRenderTemplate = (timerTime) => {
  if (timerTime >= 0) {
    timeObj = getFullTime(timerTime);
    return `${timeObj.hours}:${timeObj.minutes}:${timeObj.seconds}`;
  }
  return 'hh:mm:ss';
}

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  if (['deleteContentBackward', 'deleteContentForward'].includes(e.inputType) || e.data && e.data.match(/\d/)) inputText = inputEl.value;
  inputEl.value = inputText;
});

buttonEl.addEventListener('click', (e) => {
  e.preventDefault();
  isLaunched ? stopTimer() : startTimer();
});

const startTimer = () => {
  const seconds = Number(inputEl.value);
  if (!seconds) return;
  isLaunched = true;
  animateTimer(seconds);
  buttonEl.innerHTML = 'Stop';
  inputEl.value = '';
  inputText = '';
}

const stopTimer = () => {
  clearInterval(timeintervalId);
  buttonEl.innerHTML = 'Start';
  renderTimer(-1);
  isLaunched = false;
}