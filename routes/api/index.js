const router = require("express").Router();
const userRoutes = require("./users");
const contestRoutes = require("./contests");
const uploadRoutes = require("./images");

//users routes
router.use("/users",userRoutes);

//contests routes
router.use("/contests",contestRoutes);

//image upload Routes 
router.use("/img-upload",uploadRoutes);

module.exports = router;