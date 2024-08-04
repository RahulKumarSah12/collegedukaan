const { Sellers } = require("../models/sellersDb");

async function createSeller(req, res) {
  try {
    const { email } = req.body;

    const result = await Sellers.findOne({ email });
    if (result) {
      console.log("there is user");
      return res.json({
        exist: 1,
      });

      //    return res.json({
      //     msg:"You are already a seller!",
      //     success: True
      //   });
    } else {
      try {
        const newSeller = new Sellers({
          email,
        });

        await newSeller.save();

        return res.status(201).json({
          msg: "User Successfully Created",
          exist: 0,
          success: true,
          user: newSeller,
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

module.exports = {createSeller};
