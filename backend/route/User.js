const mongoose=require("mongoose");
const userSchema=require("../model/user");
const jwt=require("jsonwebtoken")
const express=require("express");
const router=express.Router();
const {isAuthenticated}=require("../config/Authentication")
const z=require("zod");
const { x } = require("tar");
const account=require("../model/bank")

const signupBody=z.object({
    username:z.string().email(),
    firstname:z.string(),
    lastname:z.string(),
    password:z.string()
})

const register=async(req,res)=>{
    console.log(req.body)
    // const {success}=signupBody.safeParse(req.body);
    // console.log(success)
    // if(!success)
    // {
    //     return res.status(411).json({
    //         message: "Incorrect inputs"
    //     })
    // }


    const {email,password,firstname,lastname}=req.body;
    console.log("user is added")
    console.log(email +" "+ password)
    let existinguser=await userSchema.findOne({email});
    if(existinguser)
    {
        return res.status(401).json({
            success: false,
            msg: "Email already taken"
        })
    }
    else{
        const user=await userSchema.create({email,password,firstname,lastname});

        const userId=user._id;
        console.log(userId)

        //updating this customer account id 

        await account.create({
            userId,
            balance:1+ Math.random()*1000
        })

        const token=await user.generatetoken();
        const options={
            expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true,
        }
        return res.status(201).cookie("token",token,options).json({
            success:true,
            user,
            token
        })
    }

}

const login=async(req,res)=>{
    const {email,password}=req.body;

    console.log(email +" "+ password)
    let existinguser=await userSchema.findOne({email});
    console.log("existinguser",existinguser)
   // console.log("password of the existing user in the db",existinguser.password)
    
    if(!existinguser)
    {
        return res.status(400).json({
            success:false,
            msg: "user does not exist"
        })
    }
    const dbpass=existinguser.password
    const isMatch=await existinguser.matchPassword(password,dbpass);
    if(!isMatch)
    {
        return res.status(400).json({
            success:false,
            message: "incorrect password"
        })
    }
    const token=await existinguser.generatetoken();    //setting cookie for 90 days for login
    const options={
        expires:new Date(Date.now()+90*24*60*60*1000),
        httpOnly:true,
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true
    }
    return res.status(200).cookie("token",token,options).json({
        success:true,
        existinguser,
        token
    })

}


const logout=async(req,res)=>{  //setting cookie for 90 days for login
    const options={
        expires:new Date(Date.now()+90*24*60*60*1000),
        httpOnly:true,
    }
    return res.status(200).cookie("token",null,options).json({
        success:true,
        msg: "logging out"
    })

}


const getProfile=async(req,res)=>{
    const {email}=req.user;
    console.log(email);
    
    return res.status(200).json({
        success:true,
        email
    })
}

const updateProfile=async(req,res)=>{
    try{
        console.log("user id ",req.user._id)
        const user=await userSchema.findByIdAndUpdate({_id:req.user._id},req.body);
        await user.save();

        return res.status(200).json({
            success:true,
            message:"User updated succesfully"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            error:error
        })
    }
}
//nned to check why this is not working properly
const filterable=async(req,res)=>{
    console.log('filterable')
    const filter=req.query.filter || "";
    console.log(filter)

    try{
        // console.log('Query:', {
        //     $or: [
        //         { firstname: { $regex: filter, $options: 'i' } },
        //         { lastname: { $regex: filter, $options: 'i' } }
        //     ]
        // });

        const users = await userSchema.find({
            $or: [
                { firstname: { $regex: filter, $options: 'i' } },
                { lastname: { $regex: filter, $options: 'i' } }
            ]
        });
        console.log("users is ",users)
    
        return res.json({
            user: users.map(user => ({
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastname,
                _id: user._id
            }))
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            error
        })
    }
} 

//register
router.route("/register").post(register);

router.route("/login").post(login)
router.route("/logout").get(logout)

router.route("/me").get(isAuthenticated,getProfile)

router.route("/update").put(isAuthenticated,updateProfile)

router.route("/bulk").get(filterable)
module.exports=router;