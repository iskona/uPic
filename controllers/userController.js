const db = require("../models");


//Load input Validation
const validateSignupInputData = require("../validations/signup");
const validateLoginInputData = require("../validations/login");

module.exports = {
    getUserData: (req, res, next) => {
        console.log(req);
        if(!req.user)
        {
            return res.status(400).send({ email: "User Does not exists." });
        }

        db.User.findOne(
            {
                email: req.user.email
            }
        ).then(result => {
            res.json({user: result})
        }).catch( error => {
            res.json({user: null})
        })
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
                        .then(_ => res.redirect(307, "/api/users/login"))
                        .catch(err => console.log(err));
                }
            });
    },
    loginUser: function (req, res) {
            res.json({
              email: req.user.email,
              id: req.user.id})
    
    },    
    patchUser: function(req, res){
        console.log(req.user);
        if (req.user) {
            //user exists
            if(req.body.password)
            {
                // user does not exists
                return res.status(400).send({ message: "Password can not be updated." }); 
            }

            db.User
            .findOneAndUpdate(
                {
                    email: req.user.email
                },
                req.body,
                {
                    new: true
                }
            ).then(user =>res.json(user));
        } else {
          // user does not exists
          return res.status(400).send({ message: "User does not exists" });
        }
    }   
    
}