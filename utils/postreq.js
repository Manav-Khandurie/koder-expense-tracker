const axios = require('axios');

// Sample data to be posted
let data = {
  Amount: 5000,
  Description: "Some Description",
  Frequency: "Yearly",
  Base: 10000
};
console.log(JSON.stringify(data))
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://strapi.koders.in/api/expenses/',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    data
    }
};

console.log(config);
axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log('error');
  });
