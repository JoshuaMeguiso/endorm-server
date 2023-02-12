const { default: mongoose } = require('mongoose')
const Room = require('../models/roomModel')

//GET all rooms
const getRooms = async (req, res) => {
    const room = await Room.find({}).sort({createdAt: -1})
    res.status(200).json(room)
}

//GET single room
const getRoom = async (req, res) => {
    const {room_ID} = req.params
    const room = await Room.find({room_ID})
    res.status(200).json(room)
}

//POST new room
const createRoom = async(req, res) => {
    const {room_ID, room_Rate, room_Capacity, room_Occupancy} = req.body;
    try{
        const room = await Room.create({room_ID, room_Rate, room_Capacity, room_Occupancy})
        res.status(200).json(room)
    } catch (error) {
        res.json({error: error.message})
    }
}

//DELETE a room
const deleteRoom = async(req,res) => {
    const {room_ID} = req.params
    const room = await Room.findOneAndDelete({room_ID})
    res.status(200).json(room)
}

//UPDATE a room
const updateRoom = async(req,res) => {
    const {room_ID} = req.params
    const room = await Room.findOneAndUpdate({room_ID}, {
        ...req.body
    })
    res.status(200).json(room)
}


module.exports = {
    getRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom
}