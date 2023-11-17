const jwt = require('jsonwebtoken');

module.exports =  async (req, res, next) =>{
    const token = req.header("Authorization");

    console.log(`Tokon is ${req.header("Authorization")}`);

    if(!token){
        return res.status(401).json({
            msg: "Token required"
        });
    }
    else{
        try {
            console.log(`Error is here....`);
            await jwt.verify(token, process.env.jwtUsersecure, (err, decoded)=>{
                console.log(`Error is here123....`);
                if(err){
                    return res.status(401).json({
                        msg:"token is not valid"
                    });
                }

                console.log(`This user is requesting the server${decoded.user}`);
                req.user = decoded.user;
                next();
            });
        } catch (error) {
            console.log(`Something went worng! please retry!`);
            return res.status(400).json({
                msg:"Server Error"
            });
        }
    }
} 
