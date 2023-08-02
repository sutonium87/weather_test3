import axios from 'axios';
import backgroundImageService from '../services/background-image-service';
import { defaultReqWeather } from '../render/renderOneDay';
import { setBackgroundImage } from '../components/background-image';

navigator.geolocation.getCurrentPosition(success, defaultData);

function defaultData() {
  defaultReqWeather('Kyiv');
}

function success(position) {
  const apiKey = '9a33af13022740aca512e2da93c29b12';
  const coordinates = position.coords;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${coordinates.latitude}+${coordinates.longitude}&key=${apiKey}`;

  axios
    .get(url)
    .then(response => {
      return response.data.results[0].components.city
        ? response.data.results[0].components.city
        : response.data.results[0].components.village;
    })
    .then(location => {
      defaultReqWeather(location);
      setBackground(location);
    });
}

function setBackground(location) {
  backgroundImageService.query = location;
  backgroundImageService
    .makeQuery()
    .then(setBackgroundImage)
    .catch(() => {
      backgroundImageService.query = 'cloudy';
      backgroundImageService.makeQuery().then(setBackgroundImage);
    });
}
// This is a module that fetches weather information and sets the background image for a web application based on the user's geolocation or a default location. Here's a step-by-step explanation:

// 1. Import required modules and functions:
//    - `axios`: A popular library for making HTTP requests.
//    - `backgroundImageService`: A service that handles fetching and setting background images for the web application.
//    - `defaultReqWeather`: A function that fetches weather data for a default location ('Kyiv') and renders it on the web page.
//    - `setBackgroundImage`: A function that sets the background image on the web page.

// 2. `navigator.geolocation.getCurrentPosition(success, defaultData);`:
//    - This line uses the `navigator.geolocation.getCurrentPosition()` method to get the user's current geolocation coordinates.
//    - It calls the `success` function if geolocation retrieval is successful or the `defaultData` function if it fails.

// 3. `defaultData()`:
//    - This function is called if the user's geolocation is not available or if the user denies access to their location.
//    - It calls `defaultReqWeather('Kyiv')` to fetch weather data for the default location ('Kyiv') and render it on the web page.

// 4. `success(position)`:
//    - This function is called when the user's geolocation is successfully retrieved.
//    - It extracts the user's latitude and longitude coordinates from the `position` object.
//    - It constructs a URL to query the OpenCageData API for the city or village name corresponding to the coordinates.

// 5. Fetching city or village name from OpenCageData API:
//    - The code uses `axios` to make a GET request to the URL constructed in the previous step.
//    - The response data contains information about the location (city, village, etc.) based on the given latitude and longitude.
//    - The code extracts the city name (if available) or village name from the API response.

// 6. `defaultReqWeather(location)` and `setBackground(location)`:
//    - After obtaining the location name, the code calls `defaultReqWeather(location)` to fetch weather data for the retrieved location and render it on the web page using `renderOneDayWeather`.
//    - It also calls `setBackground(location)` to set the background image for the web page based on the retrieved location using the `backgroundImageService`.

// 7. `setBackground(location)`:
//    - This function sets the query parameter of the `backgroundImageService` to the retrieved location name.
//    - It then calls `backgroundImageService.makeQuery()` to fetch the background image for the specified location.
//    - If the background image fetching fails (e.g., for locations with no specific image available), it sets the query parameter to 'cloudy' (a fallback query) and tries again to fetch a background image.
//    - Finally, it calls the `setBackgroundImage` function to set the fetched background image on the web page.

// In summary, this module retrieves the user's geolocation and uses it to fetch weather information and set the background image for the web application. If geolocation retrieval fails or the user denies access, it uses a default location ('Kyiv') for weather data and a fallback background image query ('cloudy') to set the background.
