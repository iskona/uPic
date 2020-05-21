const db = require("../models");
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// PROFILE IMAGE STORING STARTS
const s3 = new aws.S3({
    accessKeyId:process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    Bucket: process.env.Bucket
});
/**to remove */

/**to remove */

// const upload = multer({ storage: storage, fileFilter: fileFilter });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
/**
* Check File Type
* @param file
* @param cb
* @return {*}
*/
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
const imageUpload = multer({
    storage: storage,
    limits: { fileSize: 15000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

//defining methods for the imagesController
module.exports = {
    //method to upload an image 
    uploadImage: function ( req, res, next){
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(req)
        imageUpload(req, res, (error) => {
            console.log("***************************************************************")
            console.log("user is "+req)
            console.log('requestOkokok', req.file);
            console.log('error', error);
            if (error) {
                console.log('errors', error);
                res.json({ error: error });
            } else {
                // If File not found
                if (req.file === undefined) {
                    console.log('Error: No File Selected!');
                    res.json('Error: No File Selected');
                } else {
                    // If Success
                    const imageName = req.file.key;
                    const imageLocation = req.file.location;// Save the file name into database into profile modelres.json
                    ({
                        image: imageName,
                        location: imageLocation
                    });
                        const imgResponse = {
                                            image: imageName,
                                            location: imageLocation
                                        }
                    //store the image details location on the  database i.e, image_owner,image_location,contest_id and Rating
                    res.json(imgResponse);
                }
            }
        });
    },
    saveImage : function (req, res ){
        console.log("*******Image controller ************");
        console.log(req.body)
        db.Image    
            .create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(422).json()) ;
    },
    getImageDetails: function(req, res){
        db.Image
            .find({contestId: req.params.contestId})
            .then(dbImages => res.json(dbImages))
            .catch(err => console.log(err));
    }

    //get images depending on contest_id
    //get image on specific location
}