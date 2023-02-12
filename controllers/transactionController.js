const { default: mongoose } = require('mongoose')
const Transaction = require('../models/transactionModel')
const Tenant = require('../models/tenantModel')
const Room = require('../models/roomModel')
const Payment = require('../models/paymentModel')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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
        
        const transaction = await Transaction.create({
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
        const tenantUpdate = await Tenant.findOneAndUpdate({tenant_ID}, {balance : (checkBalance).toString()})

        if( checkBalance <= 0 ){
            const transactionUpdate = await Transaction.findOneAndUpdate({tenant_ID, status}, {status : "true"})
            const tenantUpdateBalance = await Tenant.findOneAndUpdate({tenant_ID}, {balance : (checkBalance).toString()})
            sendMessage(
                `Good Day ${tenant[0].first_Name}!`,
                '+16292588940', tenant[0].contact_Info)

            res.status(200).json(transaction && tenantUpdate && tenantUpdateBalance && transactionUpdate)
        }
        else{
            const transactionUpdate = await Transaction.findOneAndUpdate({tenant_ID, status}, {total_Amount : checkBalance.toString()})
            sendMessage(
                `Good Day ${tenant[0].first_Name}!`, 
                '+16292588940', tenant[0].contact_Info)

            res.status(200).json(transaction && tenantUpdate && transactionUpdate)  
        }
    } catch (error) {
        res.json({error: error.message})
    }
}

//DELETE a transaction
const deleteTransaction = async(req,res) => {
    const {id} = req.params
    const transaction = await Transaction.findOneAndDelete({_id: id})
    res.status(200).json(transaction)
}

//UPDATE a transaction
const updateTransaction = async(req,res) => {
    const {id} = req.params

    try {
        const oldTransaction = await Transaction.findById({_id: id})
        const oldAmountPaid = parseFloat(oldTransaction.amount_Paid) //1000
        const transaction = await Transaction.findOneAndUpdate({_id: id}, {
            ...req.body //1000
        })
        const transactionFind = await Transaction.findById({_id: id})
        const tenant_ID = transactionFind.tenant_ID
        const tenant = await Tenant.find({tenant_ID})

        const updateBalance = parseFloat(tenant[0].balance) - parseFloat(transactionFind.amount_Paid)
        const newAmountPaid = parseFloat(transactionFind.amount_Paid) + oldAmountPaid //2000

        if(updateBalance <= 0){
            const transactionUpdate = await Transaction.findOneAndUpdate({_id: id}, {status: "true", amount_Paid: newAmountPaid.toString()})
            const tenantUpdate = await Tenant.findOneAndUpdate({tenant_ID}, {balance : updateBalance.toString()})
            const transactionFindUpdate = await Transaction.findById({_id: id})

            const start_Month = transactionFindUpdate.start_Month
            const due_Amount = transactionFindUpdate.true_Amount
            const amount_Paid = parseFloat(transactionFindUpdate.amount_Paid) - oldAmountPaid
            
            const payment = await Payment.create({tenant_ID, start_Month, due_Amount, amount_Paid: amount_Paid.toString()})

            res.status(200).json(oldTransaction && transaction && transactionFind && tenant && transactionUpdate && tenantUpdate && payment)
        }
        else{
            const transactionUpdate = await Transaction.findOneAndUpdate({_id: id}, {total_Amount: updateBalance.toString(), amount_Paid: newAmountPaid.toString()})
            const tenantUpdate = await Tenant.findOneAndUpdate({tenant_ID}, {balance : updateBalance.toString()})
            const transactionFindUpdate = await Transaction.findById({_id: id})

            const start_Month = transactionFindUpdate.start_Month
            const due_Amount = transactionFindUpdate.true_Amount
            const amount_Paid = parseFloat(transactionFindUpdate.amount_Paid) - oldAmountPaid
            
            const payment = await Payment.create({tenant_ID, start_Month, due_Amount, amount_Paid})

            res.status(200).json(oldTransaction && transaction && transactionFind && tenant && transactionUpdate && tenantUpdate && payment)
        }
        
        
    } catch (error) {
        res.json({error: error.message})
    }
}

function sendMessage(message, sender, reciever){
    client.messages 
        .create({ 
            body: message,    
            from: sender,
            to: reciever
        }) 
        .then(message => console.log(message.sid)) 
        .done();
}

module.exports = {
    getTransactions,
    getTransactionStatus,
    createTransaction,
    deleteTransaction,
    updateTransaction
}