const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { nodemailer } = require("./nodemailer");
const Otpbase = require("./otpmodel");



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

router.post("/checkOtp", async (req, res) => {
    const { otp: userGivenOtp, email } = req.body;
    try {
        const user = await Otpbase.findOne({ email });
        if (user) {
            const serverStoredOtp = user.secret;
            const isValid = userGivenOtp === serverStoredOtp;

            if (isValid) {
                console.log("OTP is valid!");
                return res.status(201).json("OTP is valid");
            } else {
                console.log("Invalid OTP.");
                return res.status(400).json("OTP is Invalid");
            }
        } else {
            return res.status(400).json("Invalid OTP");
        }
    } catch (err) {
        console.log("Something went wrong", err);
        return res.status(500).json("Internal server error");
    }
});

module.exports = router

