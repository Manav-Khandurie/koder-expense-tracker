const axios = require('axios');

let expenseIdToUpdate = '44'; // Replace 'expense_id' with the actual ID of the expense you want to update
let data = {
    Amount: 1001,
    Date : new Date(),
    Description: "Updated Description",
    Frequency: "Monthly",
    Base: 9009
  };
  

let config = {
    method: 'put', // Change the method to 'put'
    maxBodyLength: Infinity,
    url: `http://strapi.koders.in/api/expenses/39`, // Include the expense ID in the URL
    headers: {
        'Content-Type': 'application/json'
    },
    data: {data} // Pass updated data here
};
console.log(config);
axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log("error");
    });
