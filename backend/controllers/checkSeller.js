const User = require("../models/User")

async function checkisSeller(req,res) {
    const {email} = req.body;
    try{
        const result = await User.findOne({ email});
        if(result.role == 'Seller'){
            res.status(201).json({msg : `There is a seller as ${email}`,exist: 1})
        }else{
            res.status(201).json({msg : `${email} is not a Seller`,exist: 0})
        }
    }catch(err){
        console.log("error searching for the mail ID", err);
    }
    
}

module.exports = {checkisSeller}