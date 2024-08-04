const User = require('../models/User.js'); // Adjust the path as necessary

// Middleware to check if user already exists
async function checkUserExists(req, res, next) {
  try {
    const { email } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If user exists, send a response with an error message
      return res.status(400).json({ message: 'User already exists' });
    }

    // If user does not exist, proceed to the next middleware
    next();
  } catch (error) {
    // Handle any errors
    console.error('Error checking user existence:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {checkUserExists};
