const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login thru door
const loginDoor = async (req, res) => {
  const {user_Name, password} = req.body

  try {
    const user = await User.door(user_Name, password)

    const userName = user.user_Name
    const pass = user.password

    res.status(200).json({userName, pass})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// login a user
const loginUser = async (req, res) => {
  const {user_Name, password} = req.body

  try {
    const user = await User.login(user_Name, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({user_Name, token, user_Type: user.user_Type})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {user_Name, password, user_Type} = req.body

  try {
    const user = await User.signup(user_Name, password, user_Type)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({user_Name, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// update a user
const updateUser = async (req, res) => {
  const {user_Name, password} = req.body

  try {
    if (!user_Name || !password) {
      throw Error('All fields must be filled')
    }
    else{
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const user = await User.findOneAndUpdate({user_Name}, {password : hash})

      res.status(200).json(user)
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser, loginDoor, updateUser }