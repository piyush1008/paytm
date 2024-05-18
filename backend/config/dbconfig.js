const mongoose=require("mongoose");



exports.dbconnection=()=>{
    console.log("sdfsadf")
    mongoose.connect("mongodb+srv://piyush:piyush@cluster0.nsouzeb.mongodb.net/")
    .then(con=> console.log(`Database connected ${con.connection.host}`))
    .catch(err=> console.log(err));
}