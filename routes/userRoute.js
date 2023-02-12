const express = require('express')

// controller functions
const { loginUser, signupUser, loginDoor, updateUser } = require('../controllers/userController')

const router = express.Router()

// login door route
router.get('/login/door', loginDoor)

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// update user
router.put('/login/update', updateUser)

module.exports = router