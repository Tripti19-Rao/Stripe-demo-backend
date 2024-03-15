const { Schema, model } = require('mongoose')

const invoicesSchema = new Schema({
    productName:String,
    amount:Number,
    image:String
},{timestamps:true})

const Invoice = model('Invoice', invoicesSchema)

module.exports = Invoice


