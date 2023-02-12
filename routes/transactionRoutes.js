const express = require('express')
const {
    getTransactions,
    getTransactionStatus,
    createTransaction,
    deleteTransaction,
    updateTransaction
} = require('../controllers/transactionController')

const router = express.Router()

//GET all tenants
router.get('/', getTransactions)

//GET by status
router.get('/:tenant_ID/:status', getTransactionStatus)

//POST new tenant
router.post('/', createTransaction)

//DELETE new tenant
router.delete('/:id', deleteTransaction)

//UPDATE tenant
router.put('/:id', updateTransaction)

module.exports = router