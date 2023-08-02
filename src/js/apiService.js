// Pagination variables
import axios from 'axios';

// Variables for weather processing
let location = '';
let req = '';
let oneDayData = {};
let fiveDayData = {};
let moreInfoData = {};

// Variables for api
const OWM = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '8601181a914c11cc995b00a13512046c';

// Getting the right link
const GetOWM_Request = RequestType =>
  OWM + RequestType + '?q=' + location + '&appid=' + apiKey;

// Make a request to the server and get the data
const getWeatherData = async url => axios.get(url);

// Functions to retrieve data from api
const getOneDayData = searchName => {
  location = searchName;
  req = GetOWM_Request('weather');
  return getWeatherData(req).then(response =>
    dataProcessingOneDay(response.data)
  );
}; // for one day

const getFiveDayData = () => {
  req = GetOWM_Request('forecast');
  return getWeatherData(req).then(response =>
    dataProcessingFiveDays(response.data)
  );
}; // for 5 days

// We get the day of the week
const weekDayNow = data => {
  const date = new Date(data * 1000);
  const weekDay = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(
    date
  );
  return weekDay;
};

// We get a month
const monthNow = data => {
  const date = new Date(data * 1000);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  return month;
};

// Get icon data object
const getIconData = data => {
  const date = new Date(data[0].dt * 1000);
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(12);
  const getTimeObj = data.find(e => e.dt == date.getTime() / 1000);
  const iconInfo = {};
  if (getTimeObj) {
    const weather = getTimeObj.weather[0];
    const icon = 'http://openweathermap.org/img/wn/' + weather.icon + '.png';
    iconInfo.icon = icon;
    iconInfo.iconDescription = weather.description;
    return iconInfo;
  } else {
    let weather = {};
    if (data[3]) {
      weather = data[3].weather[0];
    } else {
      weather = data[0].weather[0];
    }
    const icon = 'http://openweathermap.org/img/wn/' + weather.icon + '.png';
    iconInfo.icon = icon;
    iconInfo.iconDescription = weather.description;
    return iconInfo;
  }
};

// Calculation of min/max temperature
const mathTemp = data => {
  data = data.map(e => Math.floor(e.main.temp - 273.15));
  const temp = {
    TempMin: Math.min(...data),
    TempMax: Math.max(...data),
  };
  return temp;
};

// Conversion to Celsius
const conToCel = data => Math.floor(data - 273.15);

// Add the missing 0
function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

// Get the current time
const getCurrentTime = data => {
  const dataTime = new Date(data * 1000);
  return addZero(dataTime.getHours()) + ':' + addZero(dataTime.getMinutes());
};

// Data processing for one day
const dataProcessingOneDay = response => {
  const main = response.main;
  const sys = response.sys;
  const weather = response.weather[0];
  oneDayData.city = response.name;
  oneDayData.countryCode = response.sys.country;
  oneDayData.temp = conToCel(main.temp);
  oneDayData.tempMin = conToCel(main.temp_min);
  oneDayData.tempMax = conToCel(main.temp_max);
  oneDayData.sunrise = new Date(sys.sunrise * 1000);
  oneDayData.sunset = new Date(sys.sunset * 1000);
  oneDayData.icon = 'http://openweathermap.org/img/wn/' + weather.icon + '.png';
  oneDayData.iconDescription = weather.description;
  oneDayData.timezone = response.timezone;
  return oneDayData;
};

// Data processing for 5 days
const getDate = data => new Date(data.dt * 1000).getDate();
const dataProcessingFiveDays = response => {
  const dates = response.list
    .map(element => getDate(element))
    .filter((el, idx, arr) => arr.indexOf(el) === idx);
  const list = dates
    .map(el => response.list.filter(elem => getDate(elem) === el))
    .map(element => ({
      DayNum: getDate(element[0]),
      Day: weekDayNow(element[0].dt),
      Month: monthNow(element[0].dt),
      date: element[0].dt,
      icon: getIconData(element),
      forecast: element,
      temp: mathTemp(element),
    }));
  if (list[5]) {
    list.shift();
  }
  const changedData = {
    ...response,
    list,
  };
  fiveDayData = changedData;
  return fiveDayData;
};

// Data processing for more info block
const dataProcessingMoreInfo = () => {
  moreInfoData = fiveDayData.list.map(e => ({
    date: e.date,
    DayNum: e.DayNum,
    forecast: e.forecast.map(e => ({
      time: getCurrentTime(e.dt),
      temp: Math.floor(e.main.temp - 273.15),
      humidity: e.main.humidity,
      pressure: e.main.pressure,
      speed: Number(e.wind.speed.toFixed(1)),
      icon: 'http://openweathermap.org/img/wn/' + e.weather[0].icon + '.png',
      iconDescription: e.weather[0].description,
    })),
  }));
  return moreInfoData;
};

export default {
  oneDayData,
  getOneDayData,
  getFiveDayData,
  dataProcessingMoreInfo,
};

// This code is a JavaScript module that serves as a service layer for processing weather data obtained from the OpenWeatherMap API. It exports several functions and data objects that can be used to retrieve and process weather data for one day, five days, and more detailed information:

// 1. Importing Libraries and Modules:
//    - The code imports the `axios` library, which is used to make HTTP requests.
//    - It imports the `background-image-service`, `renderOneDay`, and `background-image` modules, which are not present in this code snippet.

// 2. Variable Declarations:
//    - Variables `location`, `req`, `oneDayData`, `fiveDayData`, and `moreInfoData` are declared to store weather data and API request-related information.
//    - `OWM` and `apiKey` are constants that store the base URL of the OpenWeatherMap API and the API key, respectively.

// 3. Request Building Functions:
//    - The `GetOWM_Request` function is defined to build the URL for API requests based on the `location` and the desired request type (e.g., `'weather'` or `'forecast'`).

// 4. API Request Functions:
//    - `getOneDayData` and `getFiveDayData` are asynchronous functions that make API requests to OpenWeatherMap for weather data for one day and five days, respectively.
//    - They call the `getWeatherData` function passing the generated request URL and use `dataProcessingOneDay` and `dataProcessingFiveDays` functions to process the API response data.

// 5. Date and Time Formatting Functions:
//    - `weekDayNow` and `monthNow` functions take a UNIX timestamp and return the corresponding day of the week and month, respectively.

// 6. Icon Data Retrieval Function:
//    - `getIconData` function takes an array of weather data and returns an object with information about the weather icon and its description.

// 7. Temperature Calculation Functions:
//    - `mathTemp` function takes an array of weather data and calculates the minimum and maximum temperatures from the given data.

// 8. Time Conversion and Formatting Functions:
//    - `conToCel` function takes a temperature value in Kelvin and converts it to Celsius.
//    - `addZero` function takes a number and adds a leading zero if it is less than 10.
//    - `getCurrentTime` function takes a UNIX timestamp and returns the time in "HH:mm" format.

// 9. Data Processing Functions:
//    - `dataProcessingOneDay` processes the API response data for one day and returns a processed object containing weather information for one day.
//    - `dataProcessingFiveDays` processes the API response data for five days and returns a processed object containing weather information for five days.

// 10. Data Processing for More Info Block:
//    - `dataProcessingMoreInfo` takes the processed five-day data and maps it to create a new array with more detailed information about each day, including time, temperature, humidity, pressure, wind speed, and weather icon.

// 11. Exported Object:
//    - The module exports an object containing references to `oneDayData`, `getOneDayData`, `getFiveDayData`, and `dataProcessingMoreInfo`.
