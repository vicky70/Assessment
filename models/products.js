const mongoose = require('mongoose');

const products = new mongoose.Schema({
    
    pname:{
        type:String,
        
    }, 
    company:{
        type:String,
        
    },
    category:{
        type: String,
       
    },
    price:{
        type:String,
       
    },
    quality:{
        type:String,
        
    },
    imageUrl:{
        type:String
    }
});

module.exports = mongoose.model('products', products);