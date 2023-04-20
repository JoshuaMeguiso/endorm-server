const Tenant = require('../models/tenantModel')
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
  },
  rfid: {
    type: String,
    require: false,
    unique: true
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

  const user = await this.create({ user_Name, password: hash, user_Type, rfid : "" })

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

// static card method
userSchema.statics.loginCard = async function( rfid ) {
  const card = await this.findOne({ rfid })
  if (!card) {
    throw Error('No Registered Card')
  }

  return card
}

// static login  door method
userSchema.statics.door = async function(rfid, room_ID) {
  const card = await this.findOne({ rfid })
  if (!card) {
    throw Error('No Registered Card')
  }

  const checkPaymentStatus = await Transaction.findOne({tenant_ID: card.user_Name, status: "false"})
  const tenant = await Tenant.find({tenant_ID : card.user_Name})
  const room = tenant[0].room_ID

  if(room_ID != room){
    throw Error('Wrong Room')
  }
  if(checkPaymentStatus){
    const dueDate = new Date(checkPaymentStatus.start_Month);
    dueDate.setMonth(dueDate.getMonth() + 1);     // Add a month to the due date
    dueDate.setDate(dueDate.getDate() + 7);       // Add 7 days to the due date
    const currentDate = new Date();

    if(dueDate.getTime() < currentDate.getTime()){
      throw Error('Unpaid Bills')
    }
  }
  return card
}

module.exports = mongoose.model('User', userSchema)
