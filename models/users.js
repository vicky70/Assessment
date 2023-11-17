const mongoose = require('mongoose');

const users = new mongoose.Schema({

    username:{
        type: String,
    },
    email:{
        type:String,
    },
    lastLogin:{
        type:String
    },
    role:{
        type: String,
        
    },
    password: {
        type: String,
        
    },
    created:{
        type:String
    }
});
module.exports = mongoose.model('Users', users);