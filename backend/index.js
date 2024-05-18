const express=require('express');
const app=express();
const z=require("zod");
const cookieParser=require("cookie-parser");
const cors=require("cors")
const {dbconnection}=require("./config/dbconfig");




app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());




app.get("/",(req,res)=>{
    res.send("hello from the server");
})


//establish the db connection
dbconnection();

//mention the route 
const user=require("./route/User");
const account=require("./route/Account")

app.use("/api/v1",user);
app.use("/api/v1",account);



app.use(function(err,req,res,next){
    res.json({
        msg:"sorry something is wrong with the server"
    })
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})