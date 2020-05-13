const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Load input Validation
const validateSignupInputData = require("../../validations/signup");
const validateLoginInputData = require("../../validations/login");
//Load User Model
const User = require("../../models/User");
const Contest = require("../../models/Contest");

//set up routes
router.post("/signup", (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateSignupInputData(req.body);
    console.log("errors are "+errors)
    console.log("isValid is == "+isValid)
    // Check validation 
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User
        .findOne(
                {
                    email: req.body.email
                }
            )
            .then(user => {
                if(user){
                    return res.status(400).json({email : "Email Already exists "});
                }else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password : req.body.password
                    });

                    //Hash password before saving to the database
                    bcrypt.genSalt(10, (err,salt) => {
                        bcrypt.hash(newUser.password, salt, (err,hash) => {
                            if(err) throw err ; 
                            newUser.password = hash ;
                            //saving the new User to the database
                            newUser.save()
                                   .then(user => res.json(user))
                                   .catch(err => console.log(err));
                        })
                    })
                }
            })

})

router.post("/login", (req,res )=> {
     
    //form validation
    const {errors , isValid } = validateLoginInputData(req.body);

    //check validation
    if(!isValid){
        //return if the provided inputs are not valid
        return res.status(400).json(errors);
    }
    //if valid inputs are provided
    const email = req.body.email;
    const password = req.body.password;

    //Find this user from the database by email
    User.findOne({email})
        .then(user => {
            //checking if the user exists
            if(!user){
                return resizeBy.status(404).json( { emailNotFound: "Email Not Found "});
            }
          //check password is correct or not
             bcrypt.compare(password, user.password)
                   .then(isMatch => {
                       if(isMatch){
                           //User matched 
                           //create JWT payload
                           const payload = {
                               id: user.id,
                               name: user.name
                           }
                        
                    //Sign token
                           jwt.sign(
                               payload,
                               keys.secretOrKey,
                               {
                                   expiresIn: 31556926
                               },
                               (err, token) => {
                                   res.json({
                                       success: true,
                                       token: "Bearer "+ token
                                   })
                               }
                           )
                       }else{
                           return res 
                                .status(400)
                                .json({passwordincorrect : "Password is incorrect"});
                       }
                   })
        })
  
})

router.get("/contests", (req, res) => {
    Contest.find({})
    .then(data => {        
        console.log(data);
        res.json(data);
    })
    .catch(err => console.log(err));
})

module.exports = router;