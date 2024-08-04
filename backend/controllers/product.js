// controllers/redirectController.js
function redirectToProductPage(req, res) {
    // Assuming the token was verified and user info is in req.user
    // res.redirect('/product-page'); // Redirect to the product page
    res.json("redirect the user");
  }
  
module.exports = {
    redirectToProductPage,
  };
  