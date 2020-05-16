const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const express = require("express");
const router = express.Router();
require('dotenv').config();


// PROFILE IMAGE STORING STARTS
const s3 = new aws.S3({
    accessKeyId:process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    Bucket: process.env.Bucket
    // accessKeyId:'AKIAJ4NYYLKYJPDBVAQA',
    // secretAccessKey:'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',
    // Bucket: 'upicapp2'
});

const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'upicapp2',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 15000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profileImage');

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
/**
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post('/img-upload', (req, res) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
    profileImgUpload(req, res, (error) => {
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
                res.json(imgResponse);
            }
        }
    });
});// End of single profile upload/**
module.exports = router;