const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');

/* GET responses. */
router.get('/', (req, res, next)=>{
  expenseController.getAllExpenses(req,res)
});


/* POST create responses. */
router.post('/', (req, res, next)=>{
    expenseController.createExpense(req,res);
});

/* PUT update responses. */
router.put('/:id', (req, res, next)=>{
    expenseController.updateExpense(req,res);
});

/* DELETE  responses. */
router.delete('/', (req, res, next)=>{
    expenseController.deleteExpense(req,res);
});

module.exports = router;
