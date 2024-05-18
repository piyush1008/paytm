const express=require("express");
const user=require("../model/user")
const account=require("../model/bank")
const {isAuthenticated}=require("../config/Authentication");
const { message } = require("statuses");


const router=express.Router();


const getbalance=async(req,res)=>{
    try{
        console.log(req.user._id);
         const result=await account.findOne({userId:req.user._id});
         console.log(result);

         return res.status(200).json({
            message:true,
            balance:result.balance
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

const transfer=async(req,res)=>{
    try{
        console.log(req.body)
        const {to,amount}=req.body;
        console.log(req.user._id)
        const fromamount=await account.findOne({userId:req.user._id});
      
        if(fromamount.balance<amount)
        {
            return res.status(401).json({
                message:"Insufficient balance",
            })
        }
        console.log("afssdf")
        const toaccount=await account.findOne({userId:to});
        console.log("casd", toaccount)
        if(!toaccount)
        {
            return res.status(401).json({
                message:"Invalid account"
            })
        }

        const balanceleft=fromamount.balance-amount;
        const balanceAdded=toaccount.balance+amount;
        console.log(`balanceleft is ${balanceleft} and balance added is ${balanceAdded}`)
       await account.updateOne({
            userId: req.user._id
        }, {
            $inc: {
                balance: -amount
            }
        })
        console.log("fadsf")
    
        await account.updateOne({
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        })

        return res.status(200).json({
            message:"Transfer successful"
        })

    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

const transactiontransfer=async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
}




router.get("/account/balance",isAuthenticated,getbalance)
router.post("/account/transfer",isAuthenticated,transfer)





module.exports=router