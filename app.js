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

// Delete an expense
app.delete('/expenses/', async (req, res) => {
    console.log(req.params)
    try {
        const { id } = req.params.query;
        // console.log(req.params.query.id)
        console.log(`${API_ENDPOINT}${id}`);
        // const response = await axios.delete(`${API_ENDPOINT}${id}`);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// Create an expense
// Create an expense
app.post('/expenses', async (req, res) => {
    try {
      if (!VALID_FREQUENCIES.includes(req.body.Frequency)) {
        return res.status(400).send({ error: 'Invalid Frequency. Valid values are: ' + VALID_FREQUENCIES.join(', ') });
      }
      const data = {
        Date: new Date(),
        Amount: req.body.Amount || 0,
        Description: req.body.Description || "",
        Frequency: req.body.Frequency || VALID_FREQUENCIES[0],
        Base: req.body.Base || 0,
      }
      const POST_CONFIG = getConfig();
      const instance= axios.create(POST_CONFIG);
      console.log(data,POST_CONFIG);
      const response = await instance.post('/', {data});
      res.status(201).send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


// Get all expenses
app.get('/expenses', async (req, res) => {
    try {
      console.log("In ALL Expenses")
      const response = await axios.get(API_ENDPOINT);
      res.status(200).send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Put/Update an expense
app.put('/expenses/:id', async (req,res)=>{
    try{
    const ogdata= await axios.get(`${process.env.API_ENDPOINT}${req.params.id}`);
    const data = {
      Date: req.body.Date || ogdata.data.data.attributes.Date || new Date() ,
      Amount: req.body.Amount || ogdata.data.data.attributes.Amount ,
      Description: req.body.Description || ogdata.data.data.attributes.Description ,
      Frequency: req.body.Frequency || ogdata.data.data.attributes.Frequency || VALID_FREQUENCIES[0],
      Base: req.body.Base || ogdata.data.data.attributes.Base || 0,
    }
    // console.log(req.params.id); 
    const PUT_CONFIG = getConfig();
    const instance = axios.create(PUT_CONFIG);
    console.log(PUT_CONFIG,data)
    const response = await instance.put(`${process.env.API_ENDPOINT}${req.params.id}`, {data});
    res.status(200).send(response.data)
  }
  catch(error){
    console.log(error);
  }
});

module.exports = app;
