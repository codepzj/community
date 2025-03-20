const express = require('express');
const router = express.Router();
const paymentsController = require('../controller/payments');

router.patch('/update/:id', paymentsController.updatePaymentStatusById);

module.exports = router;