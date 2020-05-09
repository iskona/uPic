const db = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
    findOne : function(req,res){
        //checks if there is any user with the same email address
        db.User
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
                        bcrypt.hash(newUser.password, salt, (err,hash) {
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
    }
}