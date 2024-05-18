const mongoose=require("mongoose");
const { string } = require("zod");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const userSchema=mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }

})

//learn about pre in schema
userSchema.pre("save",async function(next){
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password,10);
        console.log("bcryted password", this.password)
    }
    next();
})


userSchema.methods.matchPassword=async function(password,dbpass){
    console.log(`password is ${password} and comparing it with ${dbpass}`)
    return await bcrypt.compare(password,dbpass);
}

userSchema.methods.generatetoken=function()
{
    return jwt.sign({id:this._id},"SECRET");
}
module.exports=mongoose.model("User",userSchema);