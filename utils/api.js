const axios = require('axios');
let data = '';
let config = {
method: 'get',
maxBodyLength: Infinity,
url: 'http://strapi.koders.in/api/expenses/',
headers: {
'Content-Type': 'application/json'
},
data : data
};
axios.request(config)
.then((response) => {
console.log(JSON.stringify(response.data));
})
.catch((error) => {
console.log(error);
});