const express = require("express");
const cors = require('cors');
const path = require("path");
const dotenv = require("dotenv")
const checkandSignup = require("./controllers/checkandSignup");
const {checkToken} = require("./middleware/checkToken.js");
const {checkUserExists} = require("./middleware/checkUserLogin.js")
// const {redirectToProductPage} = require("./controllers/myProduct.js")
const {login} = require('./controllers/loginUser')
const { default: mongoose } = require("mongoose");
const {createSeller} = require("./controllers/sellerslist.js");
const checkSeller = require("./controllers/checkSeller.js");
const { uploadToAllProducts } = require("./controllers/allProducts.js");
const { getAllProducts } = require("./controllers/getallprod.js");
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "ecomproject")));
app.use(express.json());

dotenv.config()
const dbs = {userdb : process.env.URL,sellersdb: process.env.SELLERSDB}

console.log(process.env.SELLERSDB);
//const url = "mongodb://127.0.0.1:27017/collegesellproduct";
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("DB Connected");
});

app.get("/", (req, res) => {
  const filePath = path.join(
    __dirname,
    "ecomproject",
    "index.html"
  );
  res.sendFile(filePath);
});

app.post("/signup", checkandSignup);
app.post("/login",checkUserExists,login);
app.post("/createSeller",createSeller);
app.post("/checkSeller",checkSeller);
// app.post("/myproduct",checkToken,redirectToProductPage);
app.post("/allproducts",checkToken,uploadToAllProducts);
app.get("/getproducts",checkToken,getAllProducts);


app.listen(9000, () => {
  console.log("http://localhost:9000");
});
// res.sendFile(path.join(__dirname, 'dist', 'your-angular-app-name', 'index.html'));
