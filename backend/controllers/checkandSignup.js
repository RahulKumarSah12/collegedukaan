const User = require("../models/User");

async function checkandSignup(req, res) {
  try {
    const { name, password, email} = req.body;

    
    const result = await User.findOne({ email});
    if (result) {
      console.log("there is already an exisitng email.");
      return res.status(400).json({
        success: false,
        error: "exisitng user",
      });
    } else {
      try {
        const newUser = new User({
          name,
          password,
          email
        });

        await newUser.save();

        newUser.password = undefined;

        return res.status(201).json({
          msg:"User Successfully Created",
          success: true,
          user: newUser,
        });
      } catch (err) {
        console.log("err occ ", err);
      }
    }
  } catch (err) {
    console.log("error here");
  }
}

//checkandSignup("newuser1","kmewrvmvp")

module.exports = checkandSignup;
