const DELAY = 1000;
let intervalId = null;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.btnStop.disabled = true;

refs.btnStart.addEventListener('click', onBtnStartColorChange);
refs.btnStop.addEventListener('click', onBtnStopColorChange); //

function onBtnStartColorChange() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
}

function onBtnStopColorChange() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
