const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const axios = require('axios');
const helmet = require('helmet');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const getDate = require('./utils/today-date');
const getConfig = require('./utils/api-config');

const app = express();
const API_ENDPOINT=process.env.API_ENDPOINT;
const VALID_FREQUENCIES = ["One-Time", "Daily", "Weekly", "Monthly", "Quarterly", "Yearly"];


app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Create an expense
// Create an expense
app.post('/expenses', async (req, res) => {
    try {
      if (!VALID_FREQUENCIES.includes(req.body.Frequency)) {
        return res.status(400).send({ error: 'Invalid Frequency. Valid values are: ' + VALID_FREQUENCIES.join(', ') });
      }
      const expensedata = {
        Date: req.body.Date || getDate(),
        Amount: req.body.Amount || 0,
        Description: req.body.Description || null,
        Frequency: req.body.Frequency,
        Base: req.body.Base || 0,
      }
      const POST_CONFIG = getConfig();
      POST_CONFIG.data = { data: expensedata };
      console.log(POST_CONFIG);
      const response = await axios.post(POST_CONFIG.url, POST_CONFIG.data);
      res.status(201).send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Get all expenses
app.get('/expenses', async (req, res) => {
    try {
      const response = await axios.get(API_ENDPOINT, getConfig());
      res.status(200).send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Delete an expense
// Delete an expense
app.delete('/expenses/:id', async (req, res) => {
    console.log("Here")
    try {
        const { id } = req.params;
        console.log(req.params)
        console.log(`${API_ENDPOINT}${id}`);
        // const response = await axios.delete(`${API_ENDPOINT}/${id}`);
        // res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = app;
