import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;

const input = document.querySelector("#datetime-picker");
const button = document.querySelector('[data-start]');

const timer = document.querySelector('.timer');
const spanDays = timer.querySelector("[data-days]");
const spanHours = timer.querySelector("[data-hours]");
const spanMinutes = timer.querySelector("[data-minutes]");
const spanSeconds = timer.querySelector("[data-seconds]");


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
    } else {
      userSelectedDate = null;
      button.disabled = true;

    iziToast.error({
      title: 'Error',
      message: "Please choose a date in the future",
      position: 'topRight', 
    });
      
    }
  },
};

flatpickr("#datetime-picker", options);



function startTimer () {
  button.disabled = true;
  input.disabled = true;

  const timerInterval = setInterval (() => {
        const dateTodayUpdate = new Date();
    const interval = userSelectedDate - dateTodayUpdate;

    if (interval <= 0) {
      clearInterval(timerInterval);
      
      iziToast.success({
        title: 'OK',
        message: 'Successfully inserted record!',
        position: 'topLeft',
    });

      input.disabled = false;
    } else {
      const leftTime = convertMs(interval);
      spanDays.textContent = addLeadingZero(leftTime.days);
      spanHours.textContent = addLeadingZero(leftTime.hours);
      spanMinutes.textContent = addLeadingZero(leftTime.minutes);
      spanSeconds.textContent = addLeadingZero(leftTime.seconds);
    }
  }, 1000);
  
}

button.addEventListener("click", startTimer);



function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}






