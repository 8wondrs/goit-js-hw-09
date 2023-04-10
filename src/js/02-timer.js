import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datePicker: document.getElementById('datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
    }
  },
};

let timerId = null;

flatpickr(refs.datePicker, options);

function updateTimer(deadline) {
  const timerEl = document.querySelector('.timer');
  const timeLeft = deadline - new Date();
  if (timeLeft <= 0) {
    clearInterval(timerId);
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((timeLeft / 1000) % 60)
    .toString()
    .padStart(2, '0');

  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}

refs.startButton.addEventListener('click', () => {
  const deadline = new Date(refs.datePicker.value);
  timerId = setInterval(() => updateTimer(deadline), 1000);
});
