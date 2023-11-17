const mongoose = require('mongoose');

const order = new mongoose.Schema({
    orderDate:{
        type:String,
        
    }, 
    customerid:{
        type:String,
        ref: "products",
        require: true
    },
    amount:{
        type: String,
    },
    status:{
        type:Boolean,
    },
    discounts:{
        type:String,
    
    },
    remarks:{
        type:String
    }
});

module.exports = mongoose.model('Orders', order);