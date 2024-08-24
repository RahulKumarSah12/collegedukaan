const multer = require("multer");                                   //this contains both formidable and multer //formidale is commeneted below multer
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const dotenv = require("dotenv");

dotenv.config();

const accessKeyId = process.env.ACCESS_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;
const Bucket = process.env.BUCKET;

// Multer storage configuration - Store the file in memory buffer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
}).single("file"); // Expecting a single file with the field name 'file'

const parsefile = async (req) => {
  console.log("A");

  return new Promise((resolve, reject) => {
    upload(req, {}, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        reject(err.message);
        return;
      }

      console.log("working until here B");

      try {
        const file = req.file;
        console.log("File upload started:", file.originalname);

        // Upload to S3
        const upload = new Upload({
          client: new S3Client({
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
            region,
          }),
          params: {
            Bucket,
            Key: `${Date.now().toString()}-${file.originalname}`,
            Body: file.buffer, // The file buffer is sent directly to S3
            ContentType: file.mimetype, // Set Content-Type header based on file type
          },
          tags: [], // Optional tags
          queueSize: 4, // Optional concurrency configuration
          partSize: 1024 * 1024 * 5, // Optional size of each part, in bytes, at least 5MB
          leavePartsOnError: false, // Optional: manually handle dropped parts
        });

        const data = await upload.done();
        console.log("S3 upload complete:", data);
        resolve(data);
      } catch (err) {
        console.error("S3 upload error:", err);
        reject(err);
      }

      console.log("d");
    });
  });
};

module.exports = parsefile;


//////////////////  with formidable and stream //////////////////////////

// const { Upload } = require("@aws-sdk/lib-storage");
// const { S3Client } = require("@aws-sdk/client-s3");
// const formidable = require("formidable");
// const { Transform } = require("stream");
// const dotenv = require("dotenv");

// dotenv.config();

// const accessKeyId = process.env.ACCESS_ID;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// const region = process.env.REGION;
// const Bucket = process.env.BUCKET;

// const parsefile = async (req) => {
//   console.log("A");

//   return new Promise((resolve, reject) => {
//     const options = {
//       maxFileSize: 100 * 1024 * 1024, // 100 MB
//       allowEmptyFiles: false,
//     };

//     console.log("working until here B");

//     const form = new formidable.IncomingForm(options);
//     console.log("working until here C");

//     form.on("error", (error) => {
//       console.error("Form error:", error);
//       reject(error.message);
//     });

//     form.on("data", (data) => {
//       if (data.name === "successUpload") {
//         console.log("Upload successful:", data.value);
//         resolve(data.value);
//       }
//     });

//     form.on("fileBegin", (formName, file) => {
//       console.log("File upload started:", file.originalFilename);

//       file.open = async function () {
//         this._writeStream = new Transform({
//           transform(chunk, encoding, callback) {
//             callback(null, chunk);
//           },
//         });

//         this._writeStream.on("error", (e) => {
//           console.error("Stream error:", e);
//           form.emit("error", e);
//         });

//         // Upload to S3
//         const upload = new Upload({
//           client: new S3Client({
//             credentials: {
//               accessKeyId,
//               secretAccessKey,
//             },
//             region,
//           }),
//           params: {
//             Bucket,
//             Key: `${Date.now().toString()}-${this.originalFilename}`,
//             Body: this._writeStream,
//             ContentType: file.mimetype, // Set Content-Type header based on file type
//           },
//           tags: [], // optional tags
//           queueSize: 4, // optional concurrency configuration
//           partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
//           leavePartsOnError: false, // optional manually handle dropped parts
//         });

//         upload
//           .done()
//           .then((data) => {
//             console.log("S3 upload complete:", data);
//             form.emit("data", { name: "successUpload", value: data });
//           })
//           .catch((err) => {
//             console.error("S3 upload error:", err);
//             form.emit("error", err);
//           });
//       };

//       file.end = function (cb) {
//         this._writeStream.on("finish", () => {
//           this.emit("end");
//           cb();
//         });
//         this._writeStream.end();
//       };
//     });

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         console.error("Form parse error:", err);
//         reject(err);
//       }
//     });

//     console.log("d");
//   });
// };

// module.exports = parsefile;
