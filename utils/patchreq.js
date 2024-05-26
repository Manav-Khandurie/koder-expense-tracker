const express = require('express');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
app.use(express.json());

const STRAPI_URL = 'http://strapi.koders.in/api/expenses/';

// Middleware to handle errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Helper function to get expenses from Strapi
const getExpenses = async () => {
  const response = await axios.get(STRAPI_URL);
  return response.data;
};

// Helper function to update an expense in Strapi
const updateExpense = async (id, data) => {
  await axios.put(`${STRAPI_URL}${id}`, data);
};

// Helper function to create a new expense in Strapi
const createExpense = async (data) => {
  await axios.post(STRAPI_URL, data);
};

// Helper function to delete an expense in Strapi
const deleteExpense = async (id) => {
  await axios.delete(`${STRAPI_URL}${id}`);
};

// Get all expenses
app.get('/expenses', asyncHandler(async (req, res) => {
  const expenses = await getExpenses();
  res.json(expenses);
}));

// Create a new expense
app.post('/expenses', asyncHandler(async (req, res) => {
  const newExpense = req.body;
  await createExpense(newExpense);
  res.status(201).send('Expense created');
}));

// Update an expense
app.put('/expenses/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedExpense = req.body;
  console.log(`-----${id}----- \n`,req.body)
  let data = req.body;
  data.date=new Date();
  console.log(data);    
  const instance= axios.create({
    method: 'put',
    maxBodyLength: Infinity,
    url: 'http://strapi.koders.in/api/expenses/',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const response = await instance.put('http://strapi.koders.in/api/expenses/',data);
  console.log(response)
  res.send('Expense updated');
}));

// Delete an expense
app.delete('/expenses/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteExpense(id);
  res.send('Expense deleted');
}));

// Schedule a cron job to update recurring expenses daily
cron.schedule('0 0 * * *', async () => {
  const expenses = await getExpenses();
  const now = new Date();

  expenses.forEach(async (expense) => {
    if (expense.frequency && expense.frequency !== 'One-Time') {
      let shouldUpdate = false;

      switch (expense.frequency) {
        case 'Daily':
          shouldUpdate = true;
          break;
        case 'Weekly':
          shouldUpdate = now.getDay() === 0;
          break;
        case 'Monthly':
          shouldUpdate = now.getDate() === 1;
          break;
        case 'Quarterly':
          shouldUpdate = now.getDate() === 1 && [0, 3, 6, 9].includes(now.getMonth());
          break;
        case 'Yearly':
          shouldUpdate = now.getDate() === 1 && now.getMonth() === 0;
          break;
      }

      if (shouldUpdate) {
        expense.amount += expense.base;
        await updateExpense(expense.id, expense);
      }
    }
  });
}, {
  timezone: 'UTC'
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
