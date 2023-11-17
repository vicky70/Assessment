const express = require('express');
const dotenv = require('dotenv');
const connectdb  = require('./config/db');

const app = express();

dotenv.config({
    path: './config/config.env'
});

connectdb();

app.use(express.json());

app.use('/SharpCart', require('./Routes/routes'));
app.use('/SharpCart', require('./Auth/auth'));

app.listen(9000, ()=>{
    console.log('server running');
});