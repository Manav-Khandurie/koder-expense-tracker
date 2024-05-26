const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const app = express();
const cron = require('node-cron');

const expenseRouter = require('./routes/expense.js');
const updateRecurringExpenses = require('./controller/expenseCronController.js');
const cronmidnight = '0 0 * * *';
const croneverymin = '* * * * *';

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/expenses', expenseRouter);

app.use('/*' , (req,res)=>{
  res.status(405).send({ "err" : "No Suitable Method"});
})


// Cron Job only at modnight
cron.schedule(cronmidnight, ()=>{
  console.log("Started Cron Job....");
  updateRecurringExpenses.updateRecurringExpenses();
});

module.exports = app;