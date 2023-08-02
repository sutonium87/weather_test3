const dayNowRef = document.querySelector('.date__day');
const monthNowRef = document.querySelector('.date__month');
const timeNowRef = document.querySelector('.date__time');
import api from './apiService';
const moment = require('moment-timezone');

const nth = function (d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const intervalId = setInterval(() => {
  const date = new Date();
  const changeDate = api.oneDayData.timezone
    ? moment(date).utcOffset(api.oneDayData.timezone / 60)
    : moment(date);
  const dayNow = date.getDate();

  const weekDayNow = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(
    date
  );

  dayNowRef.innerHTML = `${dayNow}<sup class="date__day--nth">${nth(
    dayNow
  )}</sup> ${weekDayNow}`;

  monthNowRef.textContent = new Intl.DateTimeFormat('en', {
    month: 'long',
  }).format(date);
  timeNowRef.textContent =
    pad(changeDate.hours()) +
    ':' +
    pad(changeDate.minutes()) +
    ':' +
    pad(changeDate.seconds());
}, 1000);

function pad(value) {
  return String(value).padStart(2, '0');
}

// This mdoule updates the HTML document with the current date, time, and day of the week:

// 1. Importing Dependencies:
//    - The code starts by importing two external dependencies: `api` from `'./apiService'` and the `moment-timezone` library.

// 2. Defining the `nth` Function:
//    - The `nth` function is defined to determine the appropriate suffix (st, nd, rd, th) for a given day of the month.
//    - It takes a single argument `d` (day of the month) and uses a series of conditions and a switch statement to determine the correct suffix based on the day's value.

// 3. Setting an Interval for Updating Time:
//    - The `setInterval` function is used to repeatedly execute a callback function every 1000 milliseconds (1 second).
//    - Inside this callback function, the current date and time are retrieved using the `Date` object.
//    - If `api.oneDayData.timezone` is available, the current date is adjusted to the corresponding timezone using the `moment-timezone` library.
//    - The `dayNow` variable stores the day of the month (1-31).
//    - The `weekDayNow` variable uses `Intl.DateTimeFormat` to get the short name of the current day of the week (e.g., Mon, Tue).
//    - The `dayNowRef` element's inner HTML is updated with the day of the month, including the appropriate suffix and the day of the week.

// 4. Updating Month and Time:
//    - The `monthNowRef` element's text content is updated using `Intl.DateTimeFormat` to display the full name of the current month.
//    - The `timeNowRef` element's text content is updated with the current time in the format HH:MM:SS (hours, minutes, seconds). The `pad` function is used to ensure that each component of the time is represented by at least two digits.

// 5. Defining the `pad` Function:
//    - The `pad` function takes a numeric value as an argument and ensures that it is represented as a string with at least two digits. If the value is less than 10, a '0' is added as a prefix.

// Overall, this code updates the HTML content of elements with classes `.date__day`, `.date__month`, and `.date__time` to display the current day of the month with an appropriate suffix, the full name of the current month, and the current time in HH:MM:SS format. The displayed information is updated every second.
