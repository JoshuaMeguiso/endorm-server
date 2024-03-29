const { default: mongoose } = require('mongoose')
const Token = require('../models/tokenModel');

//POST new Token
const createToken = async(req, res) => {
    const {token, tenant_ID} = req.body;
    try{
        const checkToken = await Token.find({tenant_ID})
        if(!checkToken){
            await Token.create({token, tenant_ID})
        }
        else if(checkToken[0].token != token){
            await Token.findOneAndUpdate({tenant_ID}, {token})
        }
        res.status(200).json({message: "ok"})
    } catch (error) {
        res.json({error: error.message})
    }
}

//UPDATE a Token
const updateToken = async(req,res) => {
    try {
        const {token,tenant_ID} = req.body
        const data = await Token.findOneAndUpdate({tenant_ID}, {token})
        res.status(200).json(data)
    }catch{
        res.json({error: error.message})
    }
    
}


module.exports = {
    createToken,
    updateToken
}