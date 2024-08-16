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

const app = express();
app.use(cors());
app.use("/", otpRoutes);
app.use(express.static(path.join(__dirname, "ecomproject")));
app.use(express.json());


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
app.post("/isSeller",checkisSeller)   //checkToken,
app.post("/addProduct",chkSellerToken)


app.listen(9000, () => {
  console.log("http://localhost:9000");
});
// res.sendFile(path.join(__dirname, 'dist', 'your-angular-app-name', 'index.html'));
