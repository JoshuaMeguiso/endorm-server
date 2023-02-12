const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Transaction = require('../models/transactionModel')

const Schema = mongoose.Schema

const userSchema = new Schema({
  user_Name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  user_Type: {
    type: String,
    require: true
  }
})

// static signup method
userSchema.statics.signup = async function(user_Name, password, user_Type) {

  // validation
  if (!user_Name || !password) {
    throw Error('All fields must be filled')
  }

  const exists = await this.findOne({ user_Name })

  if (exists) {
    throw Error('User ID already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ user_Name, password: hash, user_Type })

  return user
}

// static login method
userSchema.statics.login = async function(user_Name, password) {

  if (!user_Name || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ user_Name })
  if (!user) {
    throw Error('Incorrect Username or Password')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect Username or Password')
  }
  return user
}

// static login  door method
userSchema.statics.door = async function(user_Name, password) {

  const user = await this.findOne({ user_Name })
  if (!user) {
    throw Error('User not Found')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect Username or Password')
  }

  const checkPaymentStatus = await Transaction.findOne({user_Name, status: "false"})
  if(checkPaymentStatus){
    throw Error('May ara balayran!')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)