
const router = require("express").Router();
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const AWS = require('aws-sdk')
const imageController = require("../../controllers/ImagesController");

const s3 = new AWS.S3({
  accessKeyId: 'AKIAJ4NYYLKYJPDBVAQA',
  secretAccessKey: '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'
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    console.log('~~~~~~~~~File passed: from fileName-storage method ~~~~~~~~~~~');
    console.log(file);
    console.log("original name " + file.originalname);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype); if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}
async function uploadFile(filePath, fileName) {
  console.log("filename argument is " + filePath)
  console.log(typeof filePath);
  const fileData = fs.readFileSync(filePath);
  if (!fileData) throw new Error("There is some problem with the file reading!!");

  const params = {
    Bucket: 'upicapp2',
    Key: fileName,
    Body: fileData
  };
  var s3UploadPromise = s3.upload(params, function (s3Err, data) {
    if (s3Err) throw s3Err;
    console.log(`File Uploaded Successfully at ${data.Location}`);
  }).promise();
  var s3Data = await s3UploadPromise;
  console.log('----------------------------------------------------------');
  console.log(s3Data.Location);
  return s3Data.Location;
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 15000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

router
  .post("/img-upload", upload.single('contestImage'), async (req, res, next) => {

    try {
      console.log('************')
      console.log(req.file.filename)
      var filePath = req.file.path;
      var fileName = req.file.filename;
      console.log("file name passed is " + fileName);
      var imageURL = await uploadFile(filePath, fileName);
      console.log('=============imageURL ==============');
      console.log(imageURL);

      // sharp(req.file.path)
      //   .resize(200, 200)
      //   .toFile('uploads/' + 'thumbnails-' + req.file.originalname, async (err, resizeImage) => {
      //     if (err) {
      //         console.log(err);
      //     } else {

      //      var thumbURL = await uploadFile(`uploads/thumbnails-${req.file.originalname}`,`thumbnails-${req.file.originalname}`);
      //      console.log('=============thumbURL ==============');
      //      console.log(thumbURL);

      //     }
      // });
      if (imageURL) {
        var resizeImage = await sharp(req.file.path).resize(200, 200).toFile('uploads/' + 'thumbnails-' + req.file.originalname);
        console.log('resizeImage ---');
        console.log(resizeImage);
        if (resizeImage) {
          var thumbURL = await uploadFile(`uploads/thumbnails-${req.file.originalname}`, `thumbnails-${req.file.originalname}`);
          console.log('=============thumbURL ==============');
          console.log(thumbURL);
         
          const imgResponse = {
            imageUrl: imageURL,
            thumbnailUrl: thumbURL
          }
          res.json(imgResponse);
        }
      }
      return res.status(500).json();
    } catch (error) {
      console.error(error);
    }
  });

router
  .route("/saveImage")
  .post(imageController.saveImage);
module.exports = router;