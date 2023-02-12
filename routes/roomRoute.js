const express = require('express')
const {
    getRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom
} = require('../controllers/roomController')

const router = express.Router()

//GET all authentication
router.get('/', getRooms)

//GET single authentication
router.get('/:room_ID', getRoom)

//POST new authentication
router.post('/', createRoom)

//DELETE new authentication
router.delete('/:room_ID', deleteRoom)

//UPDATE authentication
router.put('/:room_ID', updateRoom)

module.exports = router