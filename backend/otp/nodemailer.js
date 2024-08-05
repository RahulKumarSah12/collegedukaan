const dotenv = require("dotenv");
const Otpbase = require("./otpmodel");
const nodemailerLib = require("nodemailer");
const { authenticator } = require("otplib");

dotenv.config();

async function nodemailer(clientMailId) {
    // Create a transporter object using SMTP transport
    const transporter = nodemailerLib.createTransport({
        service: "gmail",
        auth: {
            user: "saisouravsahu@gmail.com",
            pass: process.env.APP_PASSWORD, // Use an app-specific password if 2FA is enabled
        },
        tls: {
            rejectUnauthorized: false, // Allow self-signed certificates
        },
    });

    // Generate an OTP
    const secret = authenticator.generateSecret();
    const otp = authenticator.generate(secret);
    console.log("Generated OTP:", otp);

    // Find if the email exists
    try {
        const user = await Otpbase.findOne({ email: clientMailId });
        if (user) {
            await Otpbase.findOneAndUpdate(
                { email: clientMailId }, // Filter criteria
                { $set: { secret: otp } } // Update operation
            );
            console.log("Secret updated for user");
        } else {
            console.log("New email found");
            const newOtp = new Otpbase({
                email: clientMailId,
                secret: otp,
            });

            await newOtp.save();
        }
    } catch (err) {
        console.log("Something went wrong", err);
        return false; // Indicate failure
    }

    // Email options
    const mailOptions = {
        from: '"collegeShop🏬" <saisouravsahu@gmail.com>', // Sender address
        to: clientMailId, // List of recipients
        subject: "One Time Password🔐", // Subject line
        text: `Your OTP is ${otp}`, // Plain text body
    };

    // Send mail with defined transport object
    try {
        await transporter.sendMail(mailOptions);
        return true; // Indicate success
    } catch (error) {
        console.log("Error sending email:", error);
        return false; // Indicate failure
    }
}

module.exports = { nodemailer };
