const { authenticator } = require('otplib');

// Generate a secret
 const secret = authenticator.generateSecret();

// Generate an OTP
 const otp = authenticator.generate(secret);
 console.log('Generated OTP:', otp);   //otp

// Simulate user input (in a real application, this would come from the user)
 const userInput = 'xyz'; // For testing purposes, use the same OTP

// Verify the OTP
  const isValid = authenticator.check(userInput, secret);

   if (isValid) {
  console.log('OTP is valid!');
   } else {
  console.log('Invalid OTP.');

  
}

