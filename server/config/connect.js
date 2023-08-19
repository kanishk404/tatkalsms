const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = ()=>{

        mongoose.connect(process.env.MONGO_DB_URL)
        .then((response)=>{
            console.log("Connected to DataBase")
        })
        .catch((error)=>{
            console.log("Error Connecting To DataBase" , error)
        })
 
    
    
}

module.exports = connectDB;