const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const app = express();

const expenseRouter = require('./routes/expense.js');

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/expenses', expenseRouter);

app.use('/*' , (req,res)=>{
  res.status(405).send({ "err" : "No Suitable Method"});
})

module.exports = app;