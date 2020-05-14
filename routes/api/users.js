const router = require("express").Router();

//Load User Controller
const userController = require("../../controllers/userController");

//set up routes

//equivalent to "/api/users/signup"
router
    .route("/signup")
    .post(userController.createUser);

//equivalent to "/api/users/login"
router
    .route("/login")
    .post(userController.loginUser);


module.exports = router;