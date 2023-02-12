const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roomSchema = new Schema({
  room_ID: {
    type: String,
    required: true,
    unique: true
  },
  room_Rate: {
    type: Number,
    required: true
  },
  room_Capacity: {
    type: Number,
    required: true
  },
  room_Occupancy: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('rooms', roomSchema)