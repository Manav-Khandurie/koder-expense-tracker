const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');

/* GET responses. */
router.get('/', (req, res, next)=>{
  console.log("In Get");
  expenseController.getAllExpenses(req,res)
});


/* POST create responses. */
router.post('/', (req, res, next)=>{
    console.log("In Post")
    expenseController.createExpense(req,res);
});

/* PUT update responses. */
router.put('/:id', (req, res, next)=>{
    console.log("In Put")
    expenseController.updateExpense(req,res);
});

/* DELETE  responses. */
router.delete('/', (req, res, next)=>{
    console.log("In Delete")
});

module.exports = router;
