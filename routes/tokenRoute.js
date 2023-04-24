const express = require('express')
const {
    createToken,
    updateToken
} = require('../controllers/tokenController')

const router = express.Router()

//POST new token
router.post('/create', createToken)

//UPDATE token
router.put('/update', updateToken)

module.exports = router