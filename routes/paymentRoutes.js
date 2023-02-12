const express = require('express')
const {
    getPayments,
    getPayment,
    deletePayment,
    updatePayment
} = require('../controllers/paymentController')

const router = express.Router()

//GET all authentication
router.get('/', getPayments)

//GET single authentication
router.get('/:tenant_ID', getPayment)

//DELETE new authentication
router.delete('/:_id', deletePayment)

//UPDATE authentication
router.put('/:_id', updatePayment)

module.exports = router