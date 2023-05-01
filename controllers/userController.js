const User = require('../models/userModel')
const Tenant = require('../models/tenantModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//get room and uid
const getRoom = async (req, res) => {

  try{
    const user = await User.find({})
    let compareCount = await User.countDocuments({});
    let count = 0;
    let data = []
    
    while(count < compareCount){
      if(user[count] != null){
        let tenant = await Tenant.find({tenant_ID : user[count].user_Name})
        if(tenant[0] != null){
          let obj = {
            room_ID : tenant[0].room_ID,
            rfid : user[count].rfid
          }
          data.push(obj);
          count++;
        }
        else{
          break
        }  
      }
    }
    res.status(200).json({data})
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}

//login thru door
const loginDoor = async (req, res) => {
  const { room_ID } = req.params
  const { rfid } = req.body

  try {
    const user = await User.door(rfid, room_ID)
    const now = new Date();
    const currentDate = now.toLocaleDateString();
    const currentTime = now.toLocaleTimeString();

    const message = `This is to inform you that the room has been accessed on ${currentDate} - ${currentTime}`
    let API = `https://api.semaphore.co/api/v4/messages?apikey=${process.env.SMSAPIKEY}&number=`

    const tenant = await Tenant.find({room_ID})
    const countDocuments = await Tenant.countDocuments({room_ID})
    let count = 0;

    while(count < countDocuments){
      if(count != 0){
        API = API + `,0${tenant[count].contact_Info.slice(3)}`
      }
      else{
        API = API + `0${tenant[count].contact_Info.slice(3)}`
      }
      
      count++;
    }
    API = API + `&message=${message}`
    try{
      const response = await fetch(API, {
        method: 'POST'
      });
    }catch(error){
      console.log(error.message)
    }
    
    res.status(200).json({messsage: "ok"})
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

// login card a user
const loginUserCard = async (req, res) => {
  const { rfid } = req.body
  
  try {
    const user = await User.loginCard(rfid)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({user_Name: user.user_Name, token, user_Type: user.user_Type})
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
const updateUserCard = async (req, res) => {
  const { user_Name } = req.params
  const { rfid } = req.body

  try {
    const check = await User.findOne({rfid});
    if(check){
      if(check.rfid != ""){
        throw Error("Already Registered")
      }
    }
    const user = await User.findOneAndUpdate({user_Name}, {rfid})
    
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser, loginDoor, updateUser, updateUserCard, loginUserCard, getRoom }