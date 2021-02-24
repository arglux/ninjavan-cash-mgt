const express = require('express');
const router = express.Router();

const form = require('../controllers/form');
const transactionController = require('../controllers/transaction');
const Transaction = require('../models/transaction');

router.get('/transaction', transactionController.readAll);
router.get('/transaction/:id', transactionController.read);
router.post('/transaction', form.parse, transactionController.create);

module.exports = router;
