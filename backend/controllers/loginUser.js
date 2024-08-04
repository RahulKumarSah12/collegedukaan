const User = require('../models/User.js'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key'; // Store this in environment variables

// Login controller function
async function login(req, res) {
  const {  password,contactInfo} = req.body;
  const email = contactInfo

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log(user);

    // Compare provided password with stored password
    //const isMatch = await bcrypt.compare(password, user.password);
    console.log(password,user.password);
    if(password != user.password){
        console.log("false");
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // if (!isMatch) {
    //   return res.status(401).json({ message: 'Invalid email or password' });
    // }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '8h' });

    // Send response with token
    res.status(200).json({ token });
  
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  login
};
