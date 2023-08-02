import moreInfoTemp from '../../template/moreinfo.hbs';
import refs from '../refs';
import api from '../apiService';
let moreInfoData = {};

// Rendering more info
const renderMoreInfo = target => {
  moreInfoData = api.dataProcessingMoreInfo();
  refs.part6.classList.remove('isHiden');
  const day = Number(target.dataset.day);
  const moreDaysListItem = document.querySelectorAll('.timeWeather');
  if (moreDaysListItem) {
    moreDaysListItem.forEach(e => e.remove());
  }
  const currentMoreInfo = moreInfoData.find(e => e.DayNum == day);
  refs.moreInfoBlock.innerHTML += moreInfoTemp(currentMoreInfo.forecast);
};

// We're listening to the more info button
refs.daysFiveListblock.addEventListener('click', handleBtnMIClick);

function handleBtnMIClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName == 'BUTTON') {
    renderMoreInfo(target);
  }
}
// This code handles rendering more weather information based on user interactions:

// 1. Importing dependencies:
//    - The code starts by importing `moreInfoTemp` from a file located at `'../../template/moreinfo.hbs'`. This is a Handlebars template used for rendering the more weather information.
//    - It imports `refs` from `'../refs'`. `refs` is an object containing references to DOM elements used in the code.
//    - It imports `api` from `'../apiService'`. This module provides methods to interact with an API or process data related to weather information.

// 2. `moreInfoData` object:
//    - It initializes an empty object `moreInfoData`, which is used to store processed weather information.

// 3. `renderMoreInfo` function:
//    - This function is responsible for rendering more weather information when called.
//    - It first retrieves weather data by calling `api.dataProcessingMoreInfo()` and assigns it to the `moreInfoData` object.
//    - It removes the class `isHiden` from an element with the reference `refs.part6`. This is used to display a hidden element on the page, showing the more weather information.
//    - It extracts the `day` attribute from the `target` element, which is a day button from the UI, represented as a DOM element.
//    - It finds all elements with the class `timeWeather` and removes them from the DOM. These elements represent the previously displayed weather information for different days, and this step ensures that only the new information is shown.
//    - It searches for the weather data corresponding to the selected `day` in the `moreInfoData` array and assigns it to `currentMoreInfo`.
//    - It appends the rendered HTML content of the Handlebars template `moreInfoTemp` with the forecast data of `currentMoreInfo` to an element with the reference `refs.moreInfoBlock`. This will display the updated weather information on the page.

// 4. Event listener:
//    - The code adds an event listener to the `click` event of the element represented by `refs.daysFiveListblock`.
//    - When a click event occurs, the `handleBtnMIClick` function is called.

// 5. `handleBtnMIClick` function:
//    - This function is triggered when a click event occurs on the `refs.daysFiveListblock` element,containing multiple day buttons.
//    - It prevents the default action of the click event (e.g., form submission, page reload).
//    - It checks if the clicked element is a `BUTTON` element.
//    - If the clicked element is a button, it calls the `renderMoreInfo` function, passing the clicked button as the `target` argument.

// In summary, this code is part of a weather application and handles rendering more weather information when the user clicks on specific day buttons. It utilizes a Handlebars template to display the weather forecast for the selected day, and the data is retrieved and processed using the `apiService` module.
