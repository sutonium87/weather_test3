import fiveDayTemp from '../../template/fivedays.hbs';
import refs from '../refs';
import api from '../apiService';
let fiveDayData = {};

// Rendering the weather for 5 days
const renderFiveDaysWeather = data => {
  fiveDayData = data;
  if (document.querySelector('.temperature-box')) {
    document.querySelector('.temperature-box').remove();
    refs.todayContainer.classList.add('isHiden');
    refs.fiveDaysContainer.classList.remove('isHiden');
    refs.part2City.textContent =
      fiveDayData.city.name + ', ' + fiveDayData.city.country;
    refs.fiveDaysContaineerCityName.textContent =
      fiveDayData.city.name + ', ' + fiveDayData.city.country;
  }
  const daysListItem = document.querySelectorAll('.days-list__item');
  if (daysListItem) {
    daysListItem.forEach(e => e.remove());
  }
  refs.daysFiveListblock.innerHTML += fiveDayTemp(data);
};

// Listening to the 5 Days button
refs.btnFiveDays[0].addEventListener('click', () =>
  api.getFiveDayData().then(data => renderFiveDaysWeather(data))
);
refs.btnFiveDays[1].addEventListener('click', () =>
  api.getFiveDayData().then(data => renderFiveDaysWeather(data))
);
// This code handles rendering the weather forecast for five days:

// 1. **Importing Dependencies**:
//    - The code imports the `fiveDayTemp` function from a Handlebars template file (`fivedays.hbs`). Handlebars is a templating engine used for generating HTML markup dynamically based on data.
//    - It also imports two other modules: `refs` and `api` from their respective paths.

// 2. **Variables**:
//    - The code initializes a variable `fiveDayData` and assigns an empty object `{}` to it. This variable will be used to store the data for the five-day weather forecast.

// 3. **Rendering the Weather for 5 Days**:
//    - The `renderFiveDaysWeather` function is defined to handle rendering the weather for five days based on the provided data.
//    - The function takes a `data` parameter, which is assumed to contain the weather data for the five days.
//    - Inside the function:
//      - The `fiveDayData` variable is updated with the provided `data`.
//      - It first checks if there is a DOM element with the class `.temperature-box`. If such an element exists, it removes it from the DOM. This means that the function handling the clearing of previously displayed weather data before rendering the new one.
//      - The class `isHiden` is added to `refs.todayContainer`, indicating that the element with class `todayContainer` should be hidden (the purpose of this element is to display the weather for the current day).
//      - The class `isHiden` is removed from `refs.fiveDaysContainer`, indicating that the element with class `fiveDaysContainer` should be visible (the purpose of this element is to display the weather for the next five days).
//      - The text content of `refs.part2City` and `refs.fiveDaysContaineerCityName` elements is updated to display the city name and country for the weather forecast data.
//      - Any existing elements with the class `.days-list__item` are removed from the DOM.
//      - The Handlebars template function `fiveDayTemp` is used to generate HTML markup using the provided `data`, and the generated markup is appended to the `refs.daysFiveListblock` element.

// 4. **Event Listeners**:
//    - The code sets up two event listeners on elements with class `btnFiveDays`.
//    - When the elements are clicked, the corresponding event listeners are triggered.
//    - Each event listener makes a call to `api.getFiveDayData()` (assuming it fetches the weather data for the next five days using the `api.getFiveDayData()` function) and then calls the `renderFiveDaysWeather` function to render the weather forecast based on the fetched data.

// In summary, this code handles rendering the weather forecast for five days. When a button with class `btnFiveDays` is clicked, the code fetches the weather data for the next five days using the `api.getFiveDayData()` function, and then it uses Handlebars to generate HTML markup based on the fetched data.
//  The generated markup is then displayed on the page, replacing any existing weather data for the five days.
