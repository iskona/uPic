const db = require("../models/");
const mail = require("../config/mailjet");

// Defining methods for the contestsController
module.exports = {
    findAll: function (req, res) {
        db.Contest.find({})
            .then(data => {
                res.json(data);
            })
            .catch(err => console.log(err));
    },
    findContestEmail: function (req, res) {
        db.Contest
            .find(
            {
                owner: req.user.email
            }
        ).then(data => {
            res.json(data)
        })
            .catch(err => console.log(err));
    },

    //Post new Contest
    create: function (req, res) {
        console.log(req.body);
        var ownerEmail = req.user.email;
        if (!req.user) {
            return res.status(400).send({ email: "User Does not exists." });
        }

        db.Contest
            .create({
                owner: ownerEmail,
                title: req.body.title,
                duedate: req.body.duedate,
                description: req.body.description,
                category: req.body.category,
                id : req.body.id
            }).then(data => {
                res.json(data);  
            }).then(() => {
                db.User.find({}).then(users =>{
                    users = users.map(user => { return {"email" : user.email}})
                    console.log(users);
                    var toemail = users.join(",")
                    console.log(toemail);
                    mail.SendEmail({
                        // to: users,
                        // title: req.body.title,
                        // description: req.body.description,
                        // duedate: req.body.duedate,
                        // category: req.body.category
                    });
                }).catch(err=> {
                    console.log(err);
                })
            }).catch(err => {
                res.status(400).json(err);
            });
    },
getContsetByID : function(req,res){
    db.Contest.findOne({
        id : req.params.id
    }).then(response=>{
        console.log(response.data);
        res.json(response)
    }).catch(err => console.log(err))
},

    patch: function(req,res){
        console.log(req.user);
        if (req.user) {
            //user exists
                db.Contest.findOneAndUpdate({
                    id: req.params.id
                },
                req.body,
                {
                    new : true
                }).then(contest => res.json(contest))
                .catch(err => {
                    console.log(err)
                    res.status(500).send({message: "Error"})})
            }
            else{
                return res.status(400).send({message : "User does not exist"} )
            }
}
}

