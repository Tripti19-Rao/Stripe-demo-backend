const Invoice = require('../model/invoice-model')
const {validationResult} = require('express-validator')
const {pick} = require('lodash')
const invoicesCltr = {}

invoicesCltr.create = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body = pick(req.body,['productName','amount','image'])
        const invoice = new Invoice(body)
        await invoice.save()
        res.json(invoice)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

invoicesCltr.list = async(req,res)=>{
    try{
        const invoices = await Invoice.find()
        res.json(invoices)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

module.exports = invoicesCltr