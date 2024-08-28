const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const checkandSignup = require("./controllers/checkandSignup");
const { checkToken } = require("./middleware/checkToken.js");
const { checkUserExists } = require("./middleware/checkUserLogin.js");
const otpRoutes = require("./otp/otpRoutes.js");
const { login } = require("./controllers/loginUser");
const { default: mongoose } = require("mongoose");
const { checkisSeller } = require("./controllers/checkSeller.js");
const router = require("./otp/otpRoutes.js");
const { chkSellerToken } = require("./middleware/checkSellerToken.js");
const { handleProduct } = require("./controllers/productHandler.js");
const { getAllProducts } = require("./controllers/getAllProducts.js");
const { getMyProducts } = require("./controllers/getMyProducts.js");
const { deleteProduct } = require("./controllers/deleteProducts.js");
const { updateProduct } = require("./controllers/updateProducts.js");
const { editProduct } = require("./controllers/editProducts.js");
const { isFilePresent } = require("./middleware/isFileAvl.js");

const app = express();
app.use(cors());
app.use("/", otpRoutes);
app.use(express.static(path.join(__dirname, "ecomproject")));
app.use(express.json());
app.set("json spaces", 5);

dotenv.config();

mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
  });

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "ecomproject", "index.html");
  res.sendFile(filePath);
});

app.post("/signup", checkandSignup);
app.post("/login", checkUserExists, login);
app.post("/isSeller", checkToken, checkisSeller); //checkToken,            reqbody email
app.post("/addProduct", chkSellerToken, handleProduct); //chkSellerToken,           req all fields
app.get("/products", checkToken, getAllProducts); //checkToken,
app.post("/myProducts", chkSellerToken, getMyProducts); //checkSellerToken
app.post("/deleteProduct", deleteProduct);
app.post("/updateProduct", updateProduct);
app.post("/editProducts", isFilePresent, editProduct); //isFilePresent,//,editProduct

app.listen(9000, () => {
  console.log("http://localhost:9000");
});
// res.sendFile(path.join(__dirname, 'dist', 'your-angular-app-name', 'index.html'));
