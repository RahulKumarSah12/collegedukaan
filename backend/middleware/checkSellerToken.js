const jwt = require('jsonwebtoken');
const secretKey = 'thesecret'; // Replace with your actual secret key

function chkSellerToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("token invalid");
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (decoded.role !== 'seller') {
        console.log("Not a seller");
        return res.status(403).json({ message: 'Access denied: Not a seller' });
      }
    console.log("token verified");
    req.user = decoded; // Store the decoded user info in the request object
    next();
  });
}

module.exports = {chkSellerToken};