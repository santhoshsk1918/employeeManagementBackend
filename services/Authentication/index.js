let jwt = require("jsonwebtoken");
let userService = require("../Users");
require("dotenv").config();

module.exports.authenticate = async (req, res, next) => {
    let authTokenSet = req.headers.authorization;
    let authToken = authTokenSet ? authTokenSet.split(" ")[1] : "";
    
    try{
        let decoded = jwt.verify(authToken, process.env.secret);
        let id = decoded.data.id;
        let user = await userService.getUserOnId(id);
        if(user){
            req.loggedInUser = user;
            return next();
        } else {
            return res.status(401).json({error: "Unauthorized: Invalid Authentication", status: 401})
        }
    }catch(err){
        return res.status(401).json({error: "Invalid JWT Token", status: 401})
    }
}

module.exports.authenticateAdmin = async (req, res, next) => {
    let authTokenSet = req.headers.authorization;
    let authToken = authTokenSet ? authTokenSet.split(" ")[1] : "";
    
    try{
        let decoded = jwt.verify(authToken, process.env.secret);
        let id = decoded.data.id;
        console.log(decoded)
        let user = await userService.getUserOnId(id);
        console.log(user);
        if(user){
            if(user.type === "Admin"){
                req.loggedInUser = user;
                return next();
            }else{ 
                return res.status(403).json({error: "Forbidden: Cannot Access these features", status: 403});
            }
        } else {
            return res.status(401).json({error: "Unauthorized: Invalid Authentication", status: 401})
        }
    }catch(err){
        console.error(err);
        return res.status(401).json({error: "Unauthorized: Invalid Authentication", status: 401})
    }
}
