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
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    req.headers['x-forwarded-proto'] = 'https';
  }
  next();
});

//Disable Redirection
app.set("trust proxy", false);
app.set("trustProxy", false);

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