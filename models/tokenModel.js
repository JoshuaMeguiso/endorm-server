const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  tenant_ID: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('token', tokenSchema)