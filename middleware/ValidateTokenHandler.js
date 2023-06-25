const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asynchandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not Authorized");
            }
            /* the variable decoded represents the payload of the JWT (JSON Web Token).

            After the JWT token is successfully verified using the jwt.verify() function, the payload contained within the token is decoded and stored in the decoded variable. The payload typically contains information about the authenticated user or any additional data associated with the token.*/
           req.User = decoded.user;// req.User is used in contactController.js and contactRoutes.js to validate 
           next();
        });

        if(!token){ // if token is not provided or not authorized
            res.status(401);
            throw new Error("User is not Authorized or Token is Missing");

        }
    }
});

module.exports = validateToken; 