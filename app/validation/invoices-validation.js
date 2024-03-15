const invoicesValdiationSchema = {
    productName:{
        notEmpty:{
            errorMessage:'Amount is required'
        },
        trim:true,
        escape:true
    },
    amount:{
        notEmpty:{
            errorMessage:'Amount is required'
        },
        isNumeric:{
            errorMessage:'Amount should be a number'
        },
        trim:true,
        escape:true
    }
}

module.exports = invoicesValdiationSchema