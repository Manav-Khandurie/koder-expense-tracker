const axios=require('axios')
const deleteConfig = {
    method: 'delete',
    url: 'http://strapi.koders.in/api/expenses/17', // replace {expense_id} with the actual ID of the expense to delete
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios.request(deleteConfig)
  .then(()=>console.log('Good'))
  .catch(()=>console.log('Not good'));
