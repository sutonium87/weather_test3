import axios from 'axios';

export default {
  searchQuery: 'kiev',
  apiKey: '38254516-2765675488b69046bf2822686',

  makeQuery() {
    const url = `https://pixabay.com/api/?image_type=backgrounds&orientation=horizontal&q=${this.query}&per_page=5&key=${this.apiKey}`;

    return axios.get(url).then(({ data: { hits } }) => {
      return hits;
    });
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },
};
// This code is a JavaScript module that exports an object representing a service to interact with the Pixabay API to fetch background images. Let's go through the code step by step:

// 1.Importing Axios:

// The code first imports the Axios library, which is a popular JavaScript library used for making HTTP requests.
// 2.Default Export Object:

// The code exports an object as the default export. This means that when this module is imported into other files using import, the imported value will be an object with the properties and methods defined in this exported object.
// 3.Properties of the Exported Object:

// searchQuery: This is a property that holds the default search query value, which is set to 'kiev'.

// apiKey: This is a property that holds the API key required to authenticate requests to the Pixabay API.

// 4.makeQuery() Method:

// This is a method of the exported object that is responsible for making a query to the Pixabay API to fetch background images based on the current search query (this.query) and the provided API key (this.apiKey).
// It constructs the API URL using template literals to include the search query and the API key as query parameters.
// It uses Axios to make a GET request to the constructed URL, which returns a Promise that will resolve with the API response.
// The response data is destructured to get the hits property, which contains an array of background image objects.
// The method returns a Promise that resolves with the hits array.
// 5.Getter and Setter for query Property:

// This code defines a getter and a setter for the query property of the exported object. The getter and setter provide a more convenient way to access and set the searchQuery property.
// The getter for query returns the value of this.searchQuery, effectively getting the current search query.
// The setter for query sets the value of this.searchQuery to the value passed as an argument, effectively setting the search query.
// In summary, this JavaScript module exports an object representing a service for fetching background images from the Pixabay API.
//  It provides the makeQuery() method to fetch images using Axios, and it also offers a more straightforward way to get and set the search query using the query getter and setter.The default search query is set to 'kiev', but it can be changed by setting a new value to the query property.
