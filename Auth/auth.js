const express   = require('express');
const router    = express.Router();
const password_encription = require('bcryptjs');
const UserM     = require('../models/users');
const createToken = require('jsonwebtoken');

router.post('/register',async (req, res, next)=>{
   const {username, email, password} = req.body;
   console.log(req.body);
   try{
        let user_exist = await UserM.findOne({email : email});
        console.log(`The value of userChecker is = ${user_exist}`);
        if(user_exist){
            return res.json({
                success:false,
                msg:"user aleadry exists"
            });
        }
        else{
            let user = new UserM();
            user.username = username;
            user.email = email;
            const salt = await password_encription.genSalt(20);
            user.password = await password_encription.hash(password, salt);

            await user.save();

            const payload= {user:{id:user.id}};
            createToken.sign(payload, process.env.jwtUsersecure, {expiresIn:'3h'}, (err, token)=>{
                return res.status(200).json({
                    success: true,
                    token
                });
            });
        }
    }
    catch(err){
        console.log(err);
    }
});

router.post('/login', async (req, res, next)=> {
    const email = req.body.email;
    const password = req.body.password;
    console.log("password is " + password + " and email is "+email);
    try{
        let user = await UserM.findOne({email});
        console.log('What is Inside user '+user);
        if(!user){
            return res.status(400).json({
                success: false,
                meg:'User not Exist! Please Register first.'
            });
        }
        else{
            const matchPassword = password_encription.compare(password, user.password);
            if(!matchPassword){
                return res.status(400).json({
                    success: false,
                    meg:'Invalid password'
                });
            }
            const payload = {user:{id:user.id}};
            console.log(`Waiting here...`);
            createToken.sign(payload, process.env.jwtUsersecure,{ expiresIn:'3h'}, (err, token)=>{
                return res.status(200).json({
                    success: true,
                    user,
                    token
                });
            });
        }
    }catch(err){
        console.log(err.message);
       return res.status(401).json({
            success: false,
            meg:'server error'
        });
    }
});
module.exports = router;