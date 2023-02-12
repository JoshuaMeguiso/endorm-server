const { default: mongoose } = require('mongoose')
const Payment = require('../models/paymentModel')

//GET all payments history
const getPayments = async (req, res) => {
    const payment = await Payment.find({}).sort({createdAt: -1})
    res.status(200).json(payment)
}

//GET single tenant payment history
const getPayment = async (req, res) => {
    const {tenant_ID} = req.params
    const payment = await Payment.find({tenant_ID}).sort({createdAt: -1})
    res.status(200).json(payment)
}

//DELETE a payment
const deletePayment = async(req,res) => {
    const {id} = req.params
    const payment = await Room.findOneAndDelete({_id: id})
    res.status(200).json(payment)
}

//UPDATE a payment
const updatePayment = async(req,res) => {
    const {id} = req.params
    const payment = await Room.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    res.status(200).json(payment)
}


module.exports = {
    getPayments,
    getPayment,
    deletePayment,
    updatePayment
}