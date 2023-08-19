require("dotenv").config();
const jwt = require("jsonwebtoken");
const user = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const registerHandler = async (req, res) => {
  try {
    const { name, email, password, balance } = req.body;
    if(email && name && password){
      const hashed_password = await bcrypt.hash(
        password,
        parseInt(process.env.SALT)
      );
      const NewUser = new user({
        name: name,
        email: email,
        password: hashed_password,
        balance: balance,
      });
  
      await NewUser.save();
      res.status(200).json({ message: "Welcome to Hogwarts" });
    }
    else{
      return res.status(401).json("Input Is Incorrect ")
    }
    
  } catch (error) {
   
    return res.status(401).json({message:"ohoo Something Bad Happend"});
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email  && password) {
      try {
        let founduser = await user.findOne({ email: email });

        const user_password = founduser.password;

        let password_match = await bcrypt.compare(password, user_password);
        if (!password_match) {
          return res.status(402).json({ message: "Incorrect Password" });
        } else {
          const token = jwt.sign(
            { userId: founduser._id.toString() },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          );
          
          return res
            .status(200)
            .json({
              message: "Login Successfull",
              token: token,
              user: {name:founduser.name, balance: founduser.balance},
            });
        }
      } catch (error) {
        return res.status(503).json({ message: "Email Not Found Are U registerd?" });
      }
    } else {
      return res.status(401).json({ message: "Email or Password is Required" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerHandler, loginHandler };
