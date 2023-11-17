const mongoose = require('mongoose');

connectdb = async ()=>{
    const connt = await mongoose.connect(process.env.MONGO_URI, 
        {useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`${connt.connection.host}`);
}

module.exports = connectdb;