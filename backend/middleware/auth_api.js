const dotenv = require('dotenv');
dotenv.config();
const Jwt = require('jsonwebtoken');
const Jwt_key = process.env.JWT_KEY;

const veryToken = (req, res, next) => {
    let token = req.headers.authorization;
    //console.log(token);
    if (token) {
        Jwt.verify(token, Jwt_key, (err, valid) => {
          if(err){
                 res.status(401).json({message:"send valid Token!"})
          }
          else{
              next();
          }
        })
        
    }
    else{
        res.status(401).json({message:"Send token"});
    }
}


module.exports = veryToken;
