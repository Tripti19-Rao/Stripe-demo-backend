const Invoice = require('../model/invoice-model')

const paymentsValidationSchema = {
  invoiceId:{
        notEmpty: {
          errorMessage: "invoice ID is empty",
        },
        isMongoId: {
          errorMessage: "Invalid ID format",
        },
        custom: {
          //checks wheather id found in database
          options: async (value, { req, res }) => {
            const id = req.body.invoiceId
            
            const findId = await Invoice.findById(id)
            if (findId) {
              return true
            } else {
              throw new Error("Invoice Id not found")
            }
          }
        }
      },
    productName:{
        notEmpty: {
            errorMessage: "invoice ID is empty",
      }
      },
    amount:{
        notEmpty:{
            errorMessage:'Amount cannot be empty'
        },
        custom: {
            //checks wheather amount matches to specific invoice
            options: async (value, { req, res }) => {
              const id = req.body.invoiceId
              const amount = req.body.amount
              const findInvoice = await Invoice.findById(id)
              if (findInvoice.amount == amount) {
                return true
              } else {
                throw new Error("Invalid amount")
              }
            }
        }   
    }
}

module.exports = paymentsValidationSchema