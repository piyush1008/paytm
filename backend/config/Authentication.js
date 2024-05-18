const JWT_SECRET="SECRET";
const jwt = require("jsonwebtoken");
const userSchema=require("../model/user")
exports.isAuthenticated=async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        console.log("authHeader is ",authHeader)
        if(!authHeader || !authHeader.startsWith('Bearer'))
        {
            return res.status(403).json({});
        }

        const token = authHeader.split(' ')[1];
        console.log("token",token)
   
        if(!token)
        {
            return res.status(401).json({
                message:"please login first"
            })
        }
        const decoded=await jwt.verify(token,JWT_SECRET)
        console.log(decoded)
        req.user=await userSchema.findById(decoded.id);
        console.log(req.user)
        next();
    }
    catch(error)
    {
        console.log("erroring out")
       return  res.status(500).json({message:"please login first"})
    }
    
}