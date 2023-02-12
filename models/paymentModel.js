const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema = new Schema({
  tenant_ID: {
    type: String,
    required: true
  },
  start_Month: {
    type: Date,
    require: true
  },
  due_Amount: {
    type: String,
    require: true
  },
  amount_Paid: {
    type: String,
    require: true
  }
}, { timestamps: true })


module.exports = mongoose.model('payment', paymentSchema)