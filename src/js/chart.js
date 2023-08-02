import Chart from 'chart.js/auto';
import refs from './refs';
import api from './apiService';
const moment = require('moment-timezone');
const ctx = document.getElementById('myChart').getContext('2d');

let chartData = {};
const average = (req, data) => {
  const values = data.map(e => e[req]);
  const sum = values.reduce((previous, current) => (current += previous));
  const avg = sum / values.length;
  return Number(avg.toFixed(1));
};

let myChart; // Variable to hold the chart instance

const getChartData = () => {
  const data = api.dataProcessingMoreInfo();
  chartData.days = data.map(e => moment(e.date * 1000).format('ll'));
  chartData.temp = data.map(e => average('temp', e.forecast));
  chartData.humidity = data.map(e => average('humidity', e.forecast));
  chartData.pressure = data.map(e => average('pressure', e.forecast));
  chartData.speed = data.map(e => average('speed', e.forecast));
};

const renderChart = () => {
  getChartData();

  // Check if the chart instance exists and destroy it
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.days,
      datasets: [
        {
          label: ' — Temperature, C°',
          backgroundColor: 'rgb(255, 107, 8)',
          borderColor: 'rgb(255, 107, 8)',
          data: chartData.temp,
          fill: false,
        },
        {
          label: ' —  Humidity, %',
          backgroundColor: 'rgb(10, 6, 234)',
          borderColor: 'rgb(10, 6, 234)',
          data: chartData.humidity,
          fill: false,
        },
        {
          label: ' —  Speed, m/s',
          backgroundColor: 'rgb(235, 155, 5)',
          borderColor: 'rgb(235, 155, 5)',
          data: chartData.speed,
          fill: false,
        },
        {
          label: ' —  Pressure, m/m',
          backgroundColor: 'rgb(5, 120, 6)',
          borderColor: 'rgb(5, 120, 6)',
          data: chartData.pressure,
          fill: false,
        },
      ],
    },

    options: {
      title: {
        display: true,
        text: 'Value of indicators',
        position: 'left',
      },
      legend: {
        display: true,
        align: 'start',

        labels: {
          boxWidth: 13,
          boxHeight: 12,
          defaultFontColor: 'rgb(5, 120, 6)',
          padding: 10,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.541)',
            },
            ticks: {
              padding: 20,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.541)',
              stepSize: 0.5,
              zeroLineColor: 'rgba(255, 255, 255, 0.541)',
            },
            ticks: {
              padding: 18,
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

refs.btnShowChart.addEventListener('click', onShowChartClick);
refs.headerOfShowChart.addEventListener('click', onShowChartClick);
refs.btnHideChart.addEventListener('click', onHideChartClick);
refs.headerOfHideChart.addEventListener('click', onHideChartClick);
// Listening to the Today button
refs.btnOneDay[0].addEventListener('click', onHideChartClick);
refs.btnOneDay[1].addEventListener('click', onHideChartClick);

function onShowChartClick() {
  refs.boxOfShowChart.classList.add('hidden');
  refs.chartBox.classList.add('visible');
  renderChart();
}

function onHideChartClick() {
  refs.chartBox.classList.remove('visible');
  refs.boxOfShowChart.classList.remove('hidden');
}
// This code sets up and renders a line chart using the Chart.js library to display weather indicators such as temperature, humidity, wind speed, and pressure. The chart data is obtained from an API and processed before being used to render the chart.

// Let's break down the code step by step:

// 1. Importing Dependencies:
//    - The code imports the necessary modules and libraries, including `Chart` from `chart.js/auto`, which is the Chart.js library that supports the latest versions.

// 2. Chart Data and Calculation Functions:
//    - The code declares a `chartData` object that will hold the processed data for rendering the chart.
//    - The `average` function is defined, which calculates the average value of a given property (`req`) in an array of data. It is used to compute the average temperature, humidity, pressure, and wind speed.

// 3. Chart Rendering Functions:
//    - The `getChartData` function retrieves data from the API using the `dataProcessingMoreInfo` function from the `apiService` module.
//    - The data is then processed to extract the dates, average temperature, average humidity, average pressure, and average wind speed for each day.
//    - The processed data is stored in the `chartData` object.

// 4. Chart Rendering:
//    - The `renderChart` function creates or updates the line chart using the Chart.js library.
//    - The function checks if a chart instance (`myChart`) already exists and, if so, destroys it to avoid duplicates.
//    - The `Chart` constructor is used to create a new line chart instance (`myChart`) with the appropriate chart data and options.

// 5. Event Listeners:
//    - Event listeners are set up to handle user interactions:
//      - The `onShowChartClick` function is called when the user clicks on elements with the class `btnShowChart` or `headerOfShowChart`. It hides a specific box (`boxOfShowChart`) and shows the chart box (`chartBox`). Then, it calls the `renderChart` function to display the chart.
//      - The `onHideChartClick` function is called when the user clicks on elements with the class `btnHideChart` or `headerOfHideChart`. It hides the chart box and shows the hidden box with class `boxOfShowChart`.

// 6. Additional Event Listeners:
//    - The `renderChart` function is also called when the user clicks on the "Today" button (`btnOneDay[0]` and `btnOneDay[1]`) to ensure that the chart updates if there is any change in the displayed weather data.

// Overall, this code sets up a line chart using Chart.js to display average weather indicators for each day obtained from the API response. The chart can be shown and hidden based on user interactions, allowing the user to view the weather trends over time.
