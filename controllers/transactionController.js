const { default: mongoose } = require('mongoose')
const Transaction = require('../models/transactionModel')
const Tenant = require('../models/tenantModel')
const Room = require('../models/roomModel')
const Payment = require('../models/paymentModel')
const Token = require('../models/tokenModel')
const axios = require("axios")

//Firebase Database
var admin = require("firebase-admin");
var serviceAccount = require("../config/privateKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const messaging = admin.messaging()

//GET all transaction
const getTransactions = async (req, res) => {
    const transaction = await Transaction.find({}).sort({createdAt: -1})
    res.status(200).json(transaction)
}

//GET transaction paid or not paid
const getTransactionStatus = async (req, res) => {
    const {tenant_ID, status} = req.params

    try{
        const transaction = await Transaction.find({tenant_ID, status})
        res.status(200).json(transaction)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//POST new transaction
const createTransaction = async(req, res) => {
    const {tenant_ID, start_Month, water_Charge, previous_Reading, present_Reading, status} = req.body;
    try{
        const tenant = await Tenant.find({tenant_ID})
        const room_ID = tenant[0].room_ID
        const room = await Room.find({room_ID})
        const room_Rate = parseFloat(room[0].room_Rate)
        const consume_Reading = present_Reading - previous_Reading
        const total_Consume = parseFloat(consume_Reading*0.4)
        const individual_Consume = (parseFloat(total_Consume)/parseInt(room[0].room_Occupancy))
        const total_Amount = parseFloat(room_Rate) + parseFloat(water_Charge) + parseFloat(individual_Consume)
        const checkBalance =  parseFloat(total_Amount) + parseFloat(tenant[0].balance)
        const date = new Date(start_Month);
        //const billMonth = date.toLocaleString('en-US', { month: 'long' });
        date.setMonth(date.getMonth() + 1);
        const dueDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        
        await Transaction.create({
            tenant_Name: tenant[0].first_Name + " " + tenant[0].last_Name,
            tenant_ID, 
            room_ID,
            start_Month, 
            room_Rate : room[0].room_Rate,
            water_Charge, 
            previous_Reading, 
            present_Reading,
            total_Consume : consume_Reading.toString(),
            room_Consume : total_Consume.toString(),
            individual_Consume : individual_Consume.toString(),
            total_Amount : total_Amount.toString(),
            status,
            amount_Paid : "0",
            true_Amount: total_Amount.toString()})
        await Tenant.findOneAndUpdate({tenant_ID}, {balance : (checkBalance).toString()})

        if( checkBalance <= 0 ){
            await Transaction.findOneAndUpdate({tenant_ID, status}, {status : "true"})
            await Tenant.findOneAndUpdate({tenant_ID}, {balance : (checkBalance).toString()})
        }
        else{
            await Transaction.findOneAndUpdate({tenant_ID, status}, {total_Amount : checkBalance.toString()}) 
        }

        //Send Push Notification
        try {
            const tokenData =  await Token.find({tenant_ID});
            const registrationToken = tokenData[0].token;
            const message = {
                notification: {
                    title: 'Statement Update!',
                    body: `Your new due is ${total_Amount} pesos on ${dueDate}`
                },
                token: registrationToken
            };
            const response = await admin.messaging().send(message);
            console.log('Successfully sent message:', response);
        } catch (error) {
            console.error('Error:', error);
        }
        res.status(200).json({message: "ok"})
        /*/Send SMS API
        const messageAPI = `Hello! Your Statement of Account for the month of ${billMonth} is now available. The amount due is ${total_Amount} pesos and the due date is ${dueDate}. To avaoid any issue, please make sure to pay before or on the due date. You can visit the Endorm application for more information.`
        const API = `https://api.semaphore.co/api/v4/messages?apikey=${process.env.SMSAPIKEY}&number=0${tenant[0].contact_Info.slice(3)}&message=${message}`
        const response = await axios.post(API);*/
    } catch (error) {
        res.json({error: error.message})
    }
}

//DELETE a transaction
const deleteTransaction = async(req,res) => {
    const {id} = req.params
    const transaction = await Transaction.findOneAndDelete({_id: id})
    const tenant = await Tenant.find({tenant_ID: transaction.tenant_ID})
    const tenantBalance = parseFloat(tenant[0].balance) - parseFloat(transaction.true_Amount)
    await Tenant.findOneAndUpdate({tenant_ID: transaction.tenant_ID},{balance: tenantBalance.toString()})

    res.status(200).json({message: "ok"})
}

//UPDATE a transaction
const updateTransaction = async(req,res) => {
    const {id} = req.params

    try {
        const oldTransaction = await Transaction.findById({_id: id})
        const oldAmountPaid = parseFloat(oldTransaction.amount_Paid) //1000
        await Transaction.findOneAndUpdate({_id: id}, {
            ...req.body //1000
        })
        const transactionFind = await Transaction.findById({_id: id})
        const tenant_ID = transactionFind.tenant_ID
        const tenant = await Tenant.find({tenant_ID})

        const updateBalance = parseFloat(tenant[0].balance) - parseFloat(transactionFind.amount_Paid)
        const newAmountPaid = parseFloat(transactionFind.amount_Paid) + oldAmountPaid //2000

        if(updateBalance <= 0){
            await Transaction.updateMany({tenant_ID, status: "false"}, {$set: {status: "true"}}, {upsert: false})
            await Transaction.findOneAndUpdate({_id: id}, {status: "true", amount_Paid: newAmountPaid.toString()})
            await Tenant.findOneAndUpdate({tenant_ID}, {balance : updateBalance.toString()})
            const transactionFindUpdate = await Transaction.findById({_id: id})

            const start_Month = transactionFindUpdate.start_Month
            const due_Amount = transactionFindUpdate.true_Amount
            const amount_Paid = parseFloat(transactionFindUpdate.amount_Paid) - oldAmountPaid
            
            await Payment.create({tenant_ID, start_Month, due_Amount, amount_Paid: amount_Paid.toString()})

            res.status(200).json({message: "ok"})
        }
        else{
            await Transaction.findOneAndUpdate({_id: id}, {total_Amount: updateBalance.toString(), amount_Paid: newAmountPaid.toString()})
            await Tenant.findOneAndUpdate({tenant_ID}, {balance : updateBalance.toString()})
            const transactionFindUpdate = await Transaction.findById({_id: id})

            const start_Month = transactionFindUpdate.start_Month
            const due_Amount = transactionFindUpdate.true_Amount
            const amount_Paid = parseFloat(transactionFindUpdate.amount_Paid) - oldAmountPaid
            
            await Payment.create({tenant_ID, start_Month, due_Amount, amount_Paid})

            res.status(200).json({message: "ok"})
        }
        
        
    } catch (error) {
        res.json({error: error.message})
    }
}

module.exports = {
    getTransactions,
    getTransactionStatus,
    createTransaction,
    deleteTransaction,
    updateTransaction
}