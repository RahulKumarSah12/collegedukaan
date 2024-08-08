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
