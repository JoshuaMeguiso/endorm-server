const express = require('express')

// controller functions
const { loginDoor, loginUser, loginUserCard, signupUser, updateUser, updateUserCard, getRoom  } = require('../controllers/userController')

const router = express.Router()

//get room and uid
router.get('/room', getRoom)

// login door route
router.post('/door/:room_ID', loginDoor)

// login route
router.post('/login', loginUser)

// login card route
router.post('/login/card', loginUserCard)

// signup route
router.post('/signup', signupUser)

// update user
router.put('/login/update', updateUser)

// update user card
router.put('/:user_Name', updateUserCard)

module.exports = router