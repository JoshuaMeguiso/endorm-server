const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tenantSchema = new Schema({
  tenant_ID: {
    type: String,
    required: true,
    unique: true
  },
  room_ID: {
    type: String,
    required: true
  },
  first_Name: {
    type: String,
    required: true
  },
  last_Name: {
    type: String,
    required: true
  },
  birth_Date: {
    type: Date,
    required: true
  }
  ,
  contact_Info: {
    type: String,
    required: true
  },
  emergency_Num: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  start_Term: {
    type: Date,
    required: true
  },
  lease_Term: {
    type: Number,
    required: true
  },
  balance: {
    type: String,
    require: true
  }
}, { timestamps: true })

module.exports = mongoose.model('tenants', tenantSchema)