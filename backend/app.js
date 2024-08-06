const express = require("express");
const multer = require('multer');
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const checkandSignup = require("./controllers/checkandSignup");
const { checkToken } = require("./middleware/checkToken.js");
const Image = require('./models/image.js')
const { checkUserExists } = require("./middleware/checkUserLogin.js");
const otpRoutes = require("./otp/otpRoutes.js");
// const {redirectToProductPage} = require("./controllers/myProduct.js")
const { login } = require("./controllers/loginUser");
const { default: mongoose } = require("mongoose");
const { createSeller } = require("./controllers/sellerslist.js");
const checkSeller = require("./controllers/checkSeller.js");
const { uploadToAllProducts } = require("./controllers/allProducts.js");
const { getAllProducts } = require("./controllers/getallprod.js");
const { Allproduct } = require("./models/allProducts.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
app.use(cors());
app.use("/", otpRoutes);
app.use(express.static(path.join(__dirname, "ecomproject")));
app.use(express.json());

dotenv.config();
//const dbs = { userdb: process.env.URL, sellersdb: process.env.SELLERSDB };

//console.log(process.env.SELLERSDB);
//const url = "mongodb://127.0.0.1:27017/collegesellproduct";
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
app.post("/createSeller", createSeller);
app.post("/checkSeller", checkSeller);
// app.post("/myproduct",checkToken,redirectToProductPage);
app.post("/allproducts",upload.single('image'),  checkToken, uploadToAllProducts);

app.get('/getproducts', async (req, res) => {
  try {
      const products = await Allproduct.find({});

      const productsWithBase64Images = products.map(product => {
          const base64Image = product.image ? Buffer.from(product.image).toString('base64') : null;
          return {
              name: product.name,
              description: product.description,
              price: product.price,
              collegeName: product.collegeName,
              location: product.location,
              image: base64Image
          };
      });

      res.json(productsWithBase64Images);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
  }
});

//donot use this this is just a reference
// app.get("/getproducts", checkToken, getAllProducts,async (req, res) => {
//   try {
//     const allfields = await Allproduct.find({});
//     const images = await Image.find({});
//     const base64Images = images.map(img => ({
//       _id: img._id,
//       contentType: img.contentType,
//       data: img.data.toString('base64') // Convert buffer to Base64 string
//     }));
//     res.status(200).json(base64Images);
//   } catch (error) {
//     res.status(500).send('Error retrieving images');
//   }
// });


// app.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const newImage = new Image({
//       data: req.file.buffer,
//       contentType: req.file.mimetype,
//     });
//     await newImage.save();
//     res.status(201).send('Image uploaded successfully');
//   } catch (error) {
//     res.status(500).send('Error uploading image');
//   }
// });

// app.get('/images', async (req, res) => {
//     try {
//       const images = await Image.find({});
//       const base64Images = images.map(img => ({
//         _id: img._id,
//         contentType: img.contentType,
//         data: img.data.toString('base64') // Convert buffer to Base64 string
//       }));
//       res.status(200).json(base64Images);
//     } catch (error) {
//       res.status(500).send('Error retrieving images');
//     }
//   });








app.listen(9000, () => {
  console.log("http://localhost:9000");
});
// res.sendFile(path.join(__dirname, 'dist', 'your-angular-app-name', 'index.html'));
