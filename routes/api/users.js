const router = require("express").Router();
var passport = require("../../config/passport");

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
    .post(passport.authenticate("local"), userController.loginUser);

router
    .route("/personalAccount")
    .get(userController.getUserData);

    router
    .route("/personalAccount")
    .patch(userController.patchUser);

module.exports = router;