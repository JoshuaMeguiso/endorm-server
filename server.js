require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoute')
const tenantRoutes = require('./routes/tenantRoute')
const roomRoutes = require('./routes/roomRoute')
const transactionRoutes = require('./routes/transactionRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

// express app
const app = express()

// middleware
app.use(express.json())

// routes
app.use('/tenant', tenantRoutes)
app.use('/user', userRoutes)
app.use('/room', roomRoutes)
app.use('/transaction', transactionRoutes)
app.use('/payment', paymentRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 