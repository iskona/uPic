
const router = require("express").Router();
const imageController = require("../../controllers/ImagesController");

router
 .route("/img-upload")
 .post(imageController.uploadImage);

 router
  .route("/saveImage")
  .post(imageController.saveImage);
module.exports = router;