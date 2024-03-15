//Dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {checkSchema} = require('express-validator')
const app = express()
const port  = 3056

//Aplication level Middlewares
app.use(express.json())
app.use(cors())

//Configuring Database
const configDB = require('./config/db')
configDB()


//Controllers
const invoicesCltr = require('./app/controller/invoices-controller')
const paymentsCltr = require('./app/controller/payments-controller')

//Validations
const invoicesValdiationSchema = require('./app/validation/invoices-validation')
const paymentsValidationSchema = require('./app/validation/payments-validation')

//Routes
//INVOICE
app.post('/api/invoices',checkSchema(invoicesValdiationSchema),invoicesCltr.create)
app.get('/api/invoices',invoicesCltr.list)

//PAYMENT
app.post('/api/create-checkout-session',checkSchema(paymentsValidationSchema),paymentsCltr.pay)
app.put('/api/payments/:id/success',paymentsCltr.successUpdate)
app.put('/api/payments/:id/failed',paymentsCltr.failedUpdate)

app.listen(port , ()=>{
    console.log("server running on port " + port)
})