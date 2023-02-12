const mongoose = require('mongoose')

const Tenant = require('./tenantModel')
const Room = require('./roomModel')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
  tenant_Name: {
    type : String
  },
  tenant_ID: {
    type: String,
    required: true
  },
  room_ID: {
    type : String
  },
  start_Month: {
    type: Date,
    required: true
  },
  room_Rate: {
    type : String
  },
  water_Charge: {
    type: Number,
    required: true
  },
  previous_Reading: {
    type: Number,
    required: true
  },
  present_Reading: {
    type: Number,
    required: true
  },
  total_Consume: {
    type: String
  },
  room_Consume: {
    type: String
  },
  individual_Consume: {
    type: String
  },
  total_Amount: {
    type: String
  },
  status: {
    type: String,
    require: true
  },
  amount_Paid: {
    type: String
  },
  true_Amount: {
    type: String
  }
}, { timestamps: true })


module.exports = mongoose.model('transactions', transactionSchema)