const axios = require('axios');
require('dotenv').config();
const API_ENDPOINT = process.env.API_ENDPOINT;

const updateRecurringExpenses = async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    const expenses = response.data.data;

    const updatePromises = expenses.map(expense => {
      const { id, attributes } = expense;
      const { Frequency, Base, Amount, Date: expenseDate } = attributes;

      let newAmount = Amount;
      let shouldUpdate = false;

      const currentDate = new Date();
      const expenseDateObj = new Date(expenseDate);

      switch (Frequency) {

        case 'Daily':
          shouldUpdate = true;
          newAmount += Base;
          break;
        case 'Weekly':
          if ((currentDate - expenseDateObj) / (1000 * 60 * 60 * 24) >= 7) {
            shouldUpdate = true;
            newAmount += Base;
          }
          break;
        case 'Monthly':
          if (currentDate.getMonth() !== expenseDateObj.getMonth()) {
            shouldUpdate = true;
            newAmount += Base;
          }
          break;
        case 'Quarterly':
          if ((currentDate.getMonth() - expenseDateObj.getMonth()) % 3 === 0) {
            shouldUpdate = true;
            newAmount += Base;
          }
          break;
        case 'Yearly':
          if (currentDate.getFullYear() !== expenseDateObj.getFullYear()) {
            shouldUpdate = true;
            newAmount += Base;
          }
          break;
        default:
          break;
      }

      if (shouldUpdate) {
        return axios.put(`${API_ENDPOINT}${id}`, {
          data: {
            Amount: newAmount
          },
        });
      }
    });

    await Promise.all(updatePromises);

    console.log('Recurring expenses updated successfully');
  } catch (error) {
    console.error('Error updating recurring expenses:', error);
  }
};

module.exports = {
    updateRecurringExpenses
};

