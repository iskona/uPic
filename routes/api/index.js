const router = require("express").Router();
const userRoutes = require("./users");
const contestRoutes = require("./contests");

//users routes
router.use("/users",userRoutes);

//contests routes
router.use("/contests",contestRoutes);

module.exports = router;