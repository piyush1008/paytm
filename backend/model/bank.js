const mongoose=require("mongoose");


const accountSchema=mongoose.Schema({
    balance:{
        type: Number,
        required: true
        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports=mongoose.model("Account",accountSchema);