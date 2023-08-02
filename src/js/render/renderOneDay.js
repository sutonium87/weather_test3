const moment = require('moment-timezone');
import oneDayTemp from '../../template/oneday.hbs';
import refs from '../refs';
import api from '../apiService';
let oneDayData = {
  city: 'None',
  countryCode: 'None',
  temp: '0',
  tempMin: '0',
  tempMax: '0',
};

// Rendering the weather for one day
const renderOneDayWeather = data => {
  oneDayData = data;
  if (!document.querySelector('.temperature-box')) {
    refs.part6.classList.add('isHiden');
    refs.contentBox.insertAdjacentHTML('afterbegin', oneDayTemp(oneDayData));
    renderSunTime(oneDayData.sunrise, oneDayData.sunset);
    refs.todayContainer.classList.remove('isHiden');
    refs.fiveDaysContainer.classList.add('isHiden');
  } else {
    document.querySelector('.temperature-box').remove();
    refs.contentBox.insertAdjacentHTML('afterbegin', oneDayTemp(oneDayData));
    renderSunTime(oneDayData.sunrise, oneDayData.sunset);
  }
};

// Render time of sunset and sunrise
function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}
const renderSunTime = (sunrise, sunset) => {
  sunrise = oneDayData.timezone
    ? moment(sunrise).utcOffset(oneDayData.timezone / 60)
    : moment(sunrise);
  sunset = oneDayData.timezone
    ? moment(sunset).utcOffset(oneDayData.timezone / 60)
    : moment(sunrise);
  const sunriseHours = addZero(sunrise.hours());
  const sunriseMinutes = addZero(sunrise.minutes());
  const sunsetHours = addZero(sunset.hours());
  const sunsetMinutes = addZero(sunset.minutes());
  refs.dateSunriseTime.textContent = sunriseHours + ':' + sunriseMinutes;
  refs.dateSunsetTime.textContent = sunsetHours + ':' + sunsetMinutes;
};

// We're listening to the weather search field
refs.searchInput.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const location = formData.get('query');
  api.getOneDayData(location).then(data => renderOneDayWeather(data));
});

// Listening for the Today button
refs.btnOneDay[0].addEventListener('click', () =>
  renderOneDayWeather(oneDayData)
);
refs.btnOneDay[1].addEventListener('click', () =>
  renderOneDayWeather(oneDayData)
);

// page launch without data
renderOneDayWeather(oneDayData);

// Query by geo or default
const defaultReqWeather = searchName => {
  api.getOneDayData(searchName).then(data => renderOneDayWeather(data));
};

export { defaultReqWeather, renderOneDayWeather };

// This module is responsible for rendering the weather information for one day on a web page. It uses Handlebars templates for rendering and depends on the `apiService` module to fetch weather data:

// 1. `const moment = require('moment-timezone');`:
//    - This line imports the `moment-timezone` library to handle time and timezones. It allows for convenient manipulation of time-related data.

// 2. `import oneDayTemp from '../../template/oneday.hbs';`:
//    - This line imports the Handlebars template named `oneday.hbs` from the specified path. This template will be used to render the weather information for one day.

// 3. `import refs from '../refs';` and `import api from '../apiService';`:
//    - These lines import two other modules named `refs` and `api` from their respective paths. These modules are used to access specific elements in the DOM (using references) and interact with the weather API to fetch data.

// 4. `let oneDayData = { ... };`:
//    - This declares a variable named `oneDayData` and initializes it as an object with some default properties representing weather information for one day (city, countryCode, temp, tempMin, and tempMax).

// 5. `const renderOneDayWeather = data => { ... }`:
//    - This is a function named `renderOneDayWeather` that takes `data` as an argument. The `data` parameter represents the weather data for one day received from the API.
//    - The function is responsible for rendering the weather information on the web page based on the provided data.

// 6. Inside `renderOneDayWeather` function:
//    - The function first assigns the received `data` to the `oneDayData` variable, updating the `oneDayData` object with the new weather information.
//    - It then checks if there is already a `.temperature-box` element in the DOM. If not, it renders the weather information using the Handlebars template (`oneDayTemp`) and inserts it into the DOM. It also updates the sunrise and sunset times using the `renderSunTime` function.
//    - If there is already a `.temperature-box` element, it removes it and re-renders the weather information with the updated `oneDayData`.

// 7. `const renderSunTime = (sunrise, sunset) => { ... }`:
//    - This function is responsible for rendering the sunrise and sunset times on the web page.
//    - It takes `sunrise` and `sunset` as arguments, which are timestamps representing the sunrise and sunset times.
//    - The function uses the `moment` library to handle timezones (if available) and converts the timestamps to display the local sunrise and sunset times in the format "hh:mm."

// 8. Event Listeners:
//    The code attaches event listeners to two elements:
//      refs.searchInput: It listens for the form submit event (when the user searches for a location) and fetches weather data for the entered location using api.getOneDayData. It then calls renderOneDayWeather to display the weather information on the web page.
//      refs.btnOneDay[0] and refs.btnOneDay[1]: They listen for click events on two buttons, likely for showing the weather information for the current day. When clicked, they call renderOneDayWeather to display the weather information.

// 9. `renderOneDayWeather(oneDayData);`:
//    - This line is executed to render the weather information for one day on page launch. It uses the initial `oneDayData` object, which is empty by default.

// 10. `const defaultReqWeather = searchName => { ... }`:
//     - This function `defaultReqWeather` is not used in the provided code. It fetches weather data using the `api.getOneDayData` function and then renders the weather information using the `renderOneDayWeather` function.

// 11. `export { defaultReqWeather, renderOneDayWeather };`:
//     - This line exports the `defaultReqWeather` and `renderOneDayWeather` functions, making them available for use in other parts of the application.

// Overall, this module provides functionality to fetch and render weather information for one day on a web page using the OpenWeatherMap API and Handlebars for templating. It also handles time zone conversion using Moment Timezone for displaying accurate sunrise and sunset times.
