const axios = require('axios');
require('dotenv').config(); 
const API_ENDPOINT = process.env.API_ENDPOINT;
const VALID_FREQUENCIES = ['Daily', 'Weekly', 'Monthly' , 'Yearly']; // Example, adjust according to your needs
const getConfig = require('../utils/api-config');


const createExpense = async (req, res) => {
    try {
        if (!VALID_FREQUENCIES.includes(req.body.Frequency)) {
            return res.status(400).send({ error: `Invalid Frequency. Valid values are: ${VALID_FREQUENCIES.join(', ')}` });
        }
        const data = {
            Date: new Date(),
            Amount: req.body.Amount || 0,
            Description: req.body.Description || "",
            Frequency: req.body.Frequency || VALID_FREQUENCIES[0],
            Base: req.body.Base || 0,
        };
        const POST_CONFIG = getConfig();
        const instance = axios.create(POST_CONFIG);
        const response = await instance.post(API_ENDPOINT, { data });
        res.status(201).send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAllExpenses = async (req, res) => {
    try {
        console.log("In ALL Expenses");
        const response = await axios.get(API_ENDPOINT);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateExpense = async (req, res) => {
    try {
        const ogdata = await axios.get(`${API_ENDPOINT}${req.params.id}`);
        const data = {
            Date: req.body.Date || ogdata.data.data.attributes.Date || new Date(),
            Amount: req.body.Amount || ogdata.data.data.attributes.Amount,
            Description: req.body.Description || ogdata.data.data.attributes.Description,
            Frequency: req.body.Frequency || ogdata.data.data.attributes.Frequency || VALID_FREQUENCIES[0],
            Base: req.body.Base || ogdata.data.data.attributes.Base || 0,
        };
        const PUT_CONFIG = getConfig();
        const instance = axios.create(PUT_CONFIG);
        console.log(PUT_CONFIG, data);
        const response = await instance.put(`${API_ENDPOINT}${req.params.id}`, { data });
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteExpense = async (req, res) => {
    console.log(req.params);
    try {
        const { id } = req.params;
        console.log(`${API_ENDPOINT}${id}`);
        const response = await axios.delete(`${API_ENDPOINT}${id}`);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    createExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense
};
