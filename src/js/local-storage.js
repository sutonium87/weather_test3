import refs from './refs.js';
import updateButtons from '../template/favorite-cities.hbs';
import addCity from '../template/oneCity.hbs';
import Siema from 'siema';
import { renderOneDayWeather } from './render/renderOneDay';
import api from './apiService';
import { changeBackgroundImage } from './components/background-image';

const storage = {
  favoriteCities: [],
};

refs.form.addEventListener('input', function () {
  if (this.value) {
    return (this.value = this.value[0].toUpperCase() + this.value.slice(1));
  }
});
createButtons(getLocalStorage());

refs.addToLocalStorageBtn.addEventListener('click', () => {
  addToLocalStorage();

  if (widthOfUserScreen < 768) {
    if (storage.favoriteCities.length > 2) {
      refs.btnNext.hidden = false;
    }
  }

  if (widthOfUserScreen > 768) {
    if (storage.favoriteCities.length > 4) {
      refs.btnNext.hidden = false;
    }
  }
});

refs.listOfButtons.addEventListener('click', event => {
  if (event.target.nodeName === 'BUTTON') {
    const textContent = event.path[1].childNodes[1].textContent;
    const indexForRemove = storage.favoriteCities.indexOf(textContent);

    mySiema.remove(indexForRemove);

    storage.favoriteCities.splice(indexForRemove, 1);

    localStorage.setItem('city', JSON.stringify(storage.favoriteCities));

    if (widthOfUserScreen < 768) {
      if (storage.favoriteCities.length <= 2) {
        refs.btnNext.hidden = true;
        refs.btnPrev.hidden = true;
      }
    }

    if (widthOfUserScreen > 768) {
      if (storage.favoriteCities.length <= 4) {
        refs.btnNext.hidden = true;
      }
    }
  }

  if (event.target.nodeName === 'P') {
    const location = event.target.textContent;
    refs.form.value = location;
    // Making a request and rendering for one day
    api.getOneDayData(location).then(data => renderOneDayWeather(data));
    // Changing the picture around the city
    changeBackgroundImage(location);
  }
});

const mySiema = new Siema({
  selector: refs.listOfButtons,
  perPage: {
    279: 2,
    768: 4,
    1119: 4,
  },
  duration: 200,
  draggable: false,
  multipleDrag: false,
  threshold: 20,
  loop: false,
});

refs.btnPrev.addEventListener('click', () => {
  mySiema.prev();
  if (mySiema.currentSlide === 0) {
    refs.btnPrev.hidden = true;
  }
});

refs.btnNext.addEventListener('click', () => {
  mySiema.next();
  if (mySiema.currentSlide > 0) {
    refs.btnPrev.hidden = false;
  }
});

if (mySiema.currentSlide === 0) {
  refs.btnPrev.hidden = true;
}

const widthOfUserScreen = window.innerWidth;

if (widthOfUserScreen < 768) {
  if (storage.favoriteCities.length <= 2) {
    refs.btnNext.hidden = true;
  }
}

if (widthOfUserScreen > 768) {
  if (storage.favoriteCities.length <= 4) {
    refs.btnNext.hidden = true;
  }
}

function clearClass() {
  refs.addToLocalStorageBtn.classList.remove('search-location__form-btn-focus');
}

function getLocalStorage() {
  const arrayOfCities = localStorage.getItem('city');

  if (!arrayOfCities) {
    return;
  }

  const parsedCities = JSON.parse(arrayOfCities);
  storage.favoriteCities = parsedCities;

  return parsedCities;
}

function createButtons(cities) {
  const markup = updateButtons(cities);

  refs.listOfButtons.insertAdjacentHTML('beforeend', markup);
}

function addToLocalStorage() {
  const city = refs.form.value;

  if (!city) {
    return;
  }

  if (storage.favoriteCities.includes(city)) {
    return;
  }

  refs.addToLocalStorageBtn.classList.add('search-location__form-btn-focus');
  storage.favoriteCities.push(city);

  localStorage.setItem('city', JSON.stringify(storage.favoriteCities));
  refs.form.value = '';

  setTimeout(clearClass, 800);

  const addNewButton = addCity(city);
  const newElement = document.createElement('div');

  newElement.innerHTML = addNewButton;

  mySiema.append(newElement);
}

// This module is responsible for managing a user interface related to weather data for favorite cities. It is handling user interactions and updating the UI accordingly:

// 1. **Import Statements**:
//    - Several modules and functions are imported, including references to various elements in the UI, handlebars templates for rendering, a slider library called Siema, rendering functions, an API service, and a function for changing the background image.

// 2. **Storage Object**:
//    - A `storage` object is created to store an array of favorite cities.

// 3. **Event Listeners**:
//    - An event listener is set on an input field to capitalize the first letter of the input value when the user types.
//    - An event listener is set on a button (`refs.addToLocalStorageBtn`) to add a city to local storage and update the UI. Depending on the user's screen width, it also manages the visibility of next buttons.

// 4. **Click Event on List of Buttons**:
//    - When a click event occurs on the list of buttons:
//      - If a button is clicked, the corresponding city is removed from the UI and storage, and local storage is updated. The visibility of next/prev buttons is also adjusted based on the screen width and the number of favorite cities.
//      - If a paragraph (`<p>`) element is clicked, the clicked city is used to make a request for one-day weather data and to change the background image around the city.

// 5. **Siema Slider Initialization**:
//    - A Siema slider is initialized with specific configuration settings for different screen widths. This slider is used to manage the display of favorite city buttons.

// 6. **Event Listeners for Slider Navigation**:
//    - Event listeners are set on previous and next buttons (`refs.btnPrev` and `refs.btnNext`) to navigate the Siema slider. The visibility of the previous button is managed based on the current slide.

// 7. **Initial Visibility and Screen Width Check**:
//    - The visibility of the previous button is set based on whether the current slide is the first one.
//    - The user's screen width is checked, and if it's less than 768 pixels or greater than 768 pixels, the visibility of next buttons is adjusted based on the number of favorite cities.

// 8. **Utility Functions**:
//    - `clearClass`: Removes a CSS class from a button.
//    - `getLocalStorage`: Retrieves favorite cities from local storage and updates the `storage` object.
//    - `createButtons`: Renders favorite city buttons using the imported Handlebars template.
//    - `addToLocalStorage`: Adds a city to local storage and updates the UI with a new button. It also manages the visibility of next/prev buttons.

// Overall, this code manages the user interface for displaying and interacting with favorite cities, including adding and removing cities, handling button clicks, updating the UI, and managing the visibility of elements based on screen width and the number of favorite cities. It provides weather-related functionality for selected cities.
