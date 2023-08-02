import refs from '../refs';
import backgroundImageService from '../services/background-image-service';

backgroundImageService.makeQuery().then(setBackgroundImage); // Setting default background at first boot up

refs.searchInput.addEventListener('submit', changeBackgroundImage);

function changeBackgroundImage(event) {
  if (typeof event == 'object') {
    event.preventDefault();
    const form = event.currentTarget;
    backgroundImageService.query = form.elements.query.value;
  } else {
    backgroundImageService.query = event;
  }
  backgroundImageService.makeQuery().then(setBackgroundImage);
}

function setBackgroundImage(backgroundImages) {
  if (backgroundImages.length === 0) {
    backgroundImageService.query = 'cloudy';
    backgroundImageService.makeQuery().then(setBackgroundImage);
  } else {
    refs.backgroundWrapper.style = `background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
  url('${backgroundImages[2].largeImageURL}') center fixed; background-size: cover;`;
  }
}

export { setBackgroundImage, changeBackgroundImage };

// This code is responsible for handling the background image of an application:

// 1.Importing Dependencies:

// The code imports two modules: refs from '../refs' and backgroundImageService from '../services/background-image-service'.
// refs contains references to DOM elements, while backgroundImageService is a custom service that handles background images, using the Pixabay API.
// 2.Setting Default Background Image:

// The code starts by calling backgroundImageService.makeQuery() to fetch background images, with a default query.
// The fetched background images are handled by the setBackgroundImage function.
// 3.Event Listener for Form Submission:

// The code adds an event listener to the submit event of the refs.searchInput element, refs.searchInput is a form element representing a search input.
// The changeBackgroundImage function is set as the event handler for the form submission event.
// 4.changeBackgroundImage Function:

// This function is the event handler for the form submission event (and for other scenarios where changeBackgroundImage is called with an argument).
// It first checks if the argument event is an object, which indicates that the function was called as an event handler for a form submission.
// If it is a form submission event, the function calls event.preventDefault() to prevent the default form submission behavior (i.e., page reload).
// It then extracts the value of the search query entered by the user from the form and sets it as the backgroundImageService.query.
// 5.Setting Background Image Based on Query:

// After setting the query, the function calls backgroundImageService.makeQuery() to fetch background images based on the query (either from the form input or a direct call).
// The fetched background images are then handled by the setBackgroundImage function.
// 6.setBackgroundImage Function:

// This function is responsible for setting the background image of the application's wrapper element (refs.backgroundWrapper) based on the fetched background images.
// If no background images are fetched (i.e., backgroundImages.length === 0), it sets the query to 'cloudy' and fetches background images again with the new query.
// If background images are fetched successfully, it sets the background of the refs.backgroundWrapper element using inline CSS with the fetched image URL.
// 7.Exporting Functions:

// The functions setBackgroundImage and changeBackgroundImage are exported as part of the module, making them available for use in other parts of the application.
// Overall, this module handles changing the background image of the application based on user input through a search form (if provided) or through some other mechanism. It uses a custom backgroundImageService to fetch images, and the setBackgroundImage function updates the background of the application accordingly.
