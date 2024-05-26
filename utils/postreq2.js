const axios = require('axios');
const getDate = require('./today-date');

// Sample data to be posted
let data = {
  Amount: 16969,
  Date: new Date(),
  Description: "MY Description",
  Frequency: "Yearly",
  Base: 1428
};

let config = {
  maxBodyLength: Infinity,
  baseURL: 'http://strapi.koders.in/api/expenses/',
  headers: {
    'Content-Type': 'application/json'
  }
};

async function fun() {
  console.log(data);
  try {
    // Create an instance with default config
    const instance = axios.create(config);
    console.log(config)
    // Make the POST request using the instance
    const response = await instance.post('/', { data });
    console.log(response.data.data.attributes);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
    }
  }
}

fun();
