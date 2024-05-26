const axios = require('axios');
const getDate = require('./today-date');


// Sample data to be posted
let data = {
  Amount: 6969,
  Date : new Date(),
  Description: "MY Description",
  Frequency: "Yearly",
  Base: 1428
};
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://strapi.koders.in/api/expenses/',
  headers: {
    'Content-Type': 'application/json'
  },
  data:  {data}
};

async function fun(){
  console.log(data);
  try {
  
  const instance= axios.create({
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://strapi.koders.in/api/expenses/',
    headers: {
      'Content-Type': 'application/json'
    },
    data:  {data}
  });
  console.log(instance)
  const response = await instance.post('http://strapi.koders.in/api/expenses/');
  console.log(response.data.attributes);
  }
  catch(error){
    console.log(error);
  }
}

fun();