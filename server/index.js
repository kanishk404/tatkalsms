const express = require("express")
const cors = require("cors")
const app = express()
const router = require("./routes/Register.js")
const PurchaseRouter = require("./routes/Product")
const axios = require("axios")

// Importing the Connect DB Function
const connectDB = require("./config/connect")

connectDB()

require("dotenv").config()

// Enabling Cors 
app.use(cors())


// Setting Up Body Parser
app.use(express.json())

PORT = process.env.PORT || 8282
IP_ADDRESS = process.env.IP_ADDRESS

app.listen(PORT, IP_ADDRESS,()=>{
    console.log(`Server is running on ${IP_ADDRESS}:${PORT}`)   
})


// Routes
app.use(PurchaseRouter)
app.use(router)




app.get("/",(req,res)=>{
    res.send("Hi U reached Here")
})

// const headers = {

//     'Authorization': 'Bearer ' + ,
//     'Accept': 'application/json',
// }


// axios.get("https://5sim.net/v1/user/buy/activation/india/virtual21/rapido", {headers})
// .then((response)=>{
//     console.log(response.data)
   
// })


    


