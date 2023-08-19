const axios = require("axios");
require("dotenv").config(); 

const user = require("../models/User");
const mongoose = require("mongoose");
const headers = {
  Authorization: "Bearer " + process.env.API_KEY,
  Accept: "application/json",
};
const handlePurchase = async (req, res) => {
  try {
   
    const { country, service, provider ,id , price } = req.body;


    const founduser = await user.findById(id)
    if(!founduser){
      throw new Error("User Not Found")
    }
    

    if (country && service && provider && founduser.balance >= price) {
      axios
        .get(`https://5sim.net/v1/user/buy/activation/${country}/${provider}/${service}`, {
          headers,
        })
        .then( async  (response) => {
          founduser.balance -= price;
          await founduser.save();
          console.log(response.data);
          return res.status(200).json(response.data)
        })
        .catch((error)=>{
            console.log(error)
        });
    }
    else{
        throw new Error('Invalid request');
    }
  } catch (error) {
    res.status(501).send({ message: "Error" + error });
  }
};

const handleCancel = (req,res)=>{

  try{
    const {orderid} = req.body;
    axios.get(`https://5sim.net/v1/user/cancel/${orderid}`, {headers})
    .then((response)=>{
      console.log(response.data)
      return res.status(200).json({message:"Order Canceled SuccessFully", })
    })
    .catch((error)=>{
      console.log(error)
      return res.status(501).json({message:"Sorry Order Could Not Be canceled" + error.data})
    })
  }
  catch(error){
    return res.status(501).json({message:"Error Happend" + error.data})
  }

}

const handleFinish = (req,res)=>{

  try{
    const {orderid} = req.body;
    axios.get(`https://5sim.net/v1/user/finish/${orderid}`, {headers})
    .then((response)=>{
      console.log(response.data)
      return res.status(200).json({message:"Order Finished SuccessFully", data:response.data})
    })
    .catch((error)=>{
      console.log("Error Occured")
      return res.status(501).json({message:"Sorry Order Could Not Be Finished" + error})
    })
  }
  catch(error){
    return res.status(501).json({message:"Error Happend" + error})
  }

}

const handleBan = (req,res)=>{

  try{
    const {orderid} = req.body;
    axios.get(`https://5sim.net/v1/user/ban/${orderid}`, {headers})
    .then((response)=>{
      console.log(response.data)
      return res.status(200).json({message:"Number Banned SuccessFully", data:response.data})
    })
    .catch((error)=>{
      console.log("Error Occured")
      return res.status(501).json({message:"Sorry Number Could Not Be Banned" + error})
    })
  }
  catch(error){
    return res.status(501).json({message:"Error Happend" + error})
  }

}

const handleSms = (req,res)=>{

  try{
    const {orderid} = req.body;
    axios.get(`https://5sim.net/v1/user/check/${orderid}`, {headers})
    .then((response)=>{
      console.log(response.data)
      return res.status(200).json({message:"Sms List Fetched", data:response.data})
    })
    .catch((error)=>{
      console.log("Error Occured")
      return res.status(501).json({message:"Sorry Sms Could Not Be Fetched" + error})
    })
  }
  catch(error){
    return res.status(501).json({message:"Error Happend" + error})
  }

}


const handleSmsList = (req,res)=>{

  try{
    const {orderid} = req.body;
    axios.get(`https://5sim.net/v1/user/sms/inbox/${orderid}`, {headers})
    .then((response)=>{
      console.log(response.data)
      return res.status(200).json({message:"Order Finished SuccessFully", data:response.data})
    })
    .catch((error)=>{
      console.log("Error Occured")
      return res.status(501).json({message:"Sorry Order Could Not Be Finished" + error})
    })
  }
  catch(error){
    return res.status(501).json({message:"Error Happend" + error})
  }

}

module.exports ={ handlePurchase, handleCancel ,handleBan, handleFinish, handleSms, handleSmsList}