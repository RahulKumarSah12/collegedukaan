const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { nodemailer } = require("./nodemailer");
const Otpbase = require("./otpmodel");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Seller = require("../models/sellers");

// Secret key for JWT
const JWT_SECRET = 'thesecret'; // Store this in environment variables

router.use(express.json());

// const url = "mongodb://127.0.0.1:27017/otpDB";
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log("DB Connected");
// });

router.post("/getOtp", async (req, res) => {
    const { email: clientemail } = req.body;
    try {
        const result = await nodemailer(clientemail);
        if (result) {
            return res.json("OTP sent, please check your mail");
        } else {
            return res.status(500).json("Failed to send OTP");
        }
    } catch (err) {
        console.log("Error in /getOtp:", err);
        return res.status(500).json("Internal server error");
    }
});

router.post("/createSeller", async (req, res) => {
    const { otp: userGivenOtp, email,phone,location,name } = req.body;   
    const x = await User.findOne({email})
    console.log("here is the id type and id>>>>>",typeof(x._id),">>>>>",x._id);
    if(x.role === "Seller"){
        res.send("Already a Seller")}
    else{
        try{
            const user = await Otpbase.findOne({ email });
            if (user) {
            const serverStoredOtp = user.secret;
            const isValid = userGivenOtp === serverStoredOtp;
            if (isValid) {
                console.log("OTP is valid!");
                await User.findOneAndUpdate(
                    { email}, 
                    { $set: { role: 'Seller' } },
                  )
                  const Sellertoken = jwt.sign({ id: user._id, role : user.role,email: user.email }, JWT_SECRET, { expiresIn: '8h' });

                  const newSeller= new Seller({
                    name,
                    email,
                    phone,
                    location
                  });
          
                  await newSeller.save();
                    
                return res.status(201).json({msg : "Seller Created",Sellertoken});
                }}
            else {
                    console.log("Invalid OTP.");
                    return res.status(400).json("OTP is Invalid");
                }
        }catch(err){
                console.log("Unable to create Seller ",err );
        }
    }           
                
         
    
});

module.exports = router

