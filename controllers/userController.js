const db = require("../models");


//Load input Validation
const validateSignupInputData = require("../validations/signup");
const validateLoginInputData = require("../validations/login");

module.exports = {
    getUserData: (req, res, next) => {
        console.log(req.user);
        if (req.user) {
          return res.json({ user: req.user });
        } else {
          return res.json({ user: null });
        }
      },
    createUser: function (req, res) {
        console.log(req.body);
        const { errors, isValid } = validateSignupInputData(req.body);
        console.log("errors are " + errors)
        console.log("isValid is == " + isValid)
        // Check validation 
        if (!isValid) {
            return res.status(400).json(errors);
        }
        //checks if there is any user with the same email address
        db.User
            .findOne(
                {
                    email: req.body.email
                }
            )
            .then(user => {
                if (user) {
                    console.log(user)
                    return res.status(400).send({ email: "Email Already exists " });

                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));


                }
            });
    },
    loginUser: function (req, res) {
            res.json({
              email: req.user.email,
              id: req.user.id})
    
    }
}