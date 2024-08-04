const express = require("express");
const cors = require('cors');
const path = require("path");
const checkandSignup = require("./controllers/checkandSignup");
const {checkToken} = require("./middleware/checkToken.js");
const {checkUserExists} = require("./middleware/checkUserLogin.js")
const {redirectToProductPage} = require("./controllers/product.js")
const {login} = require('./controllers/loginUser')
const { default: mongoose } = require("mongoose");
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "ecomproject")));
app.use(express.json());

const url = "mongodb://127.0.0.1:27017/collegesellproduct";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
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
app.post("/product",checkToken,redirectToProductPage);


app.listen(9000, () => {
  console.log("http://localhost:9000");
});
// res.sendFile(path.join(__dirname, 'dist', 'your-angular-app-name', 'index.html'));