const mongoose=require("mongoose");

async function connectDB(){
    try{
       await mongoose.connect(process.env.MONGO_DB_URI);
       console.log("Database connected successfully")
    }  catch(error){
       console.log("Error occurred while connecting to database");
       console.log(error)
    }  
}

module.exports=connectDB;