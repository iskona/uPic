const db = require("../models/");
const mail = require("../config/mailjet");
const notification = require("../config/notification");
// Defining methods for the contestsController
module.exports = {
    findAllOpenContests: function (req, res) {
        db.Contest.find({status:"open"})
            .then(data => {
                res.json(data);
            })
            .catch(err => console.log(err));
    },
    findAllClosedContests: function (req, res) {
        db.Contest.find({status:"Closed"})
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
                return data 
            })
            .catch(err => {
                res.status(400).json(err);
            })
            .then((contest)=> {
                notification.CreateContest(contest)
                return contest;
            })
            .then((contest) => {
                mail.CreateContest(contest)
            }).catch(err=> {
                console.log(err);
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
            }).then(contest =>{ 
                res.json(contest)
                return contest;
            })
            .catch(err => {
                console.log(err)
                res.status(500).send({message: "Error"})})
            .then(contest => {
                notification.UpdateContests(contest)
                return contest;
            })
            .then((contest)=> {
                mail.UpdateContest(contest)
            })
            .catch(err => 
                console.log(err)
            )   
        }
        else{
            return res.status(400).send({message : "User does not exist"} )
        }
    },
    searchforAcategory: function(req, res){
        db.Contest
            .find({category:req.params.category})
            .then(dbContests => res.json(dbContests))
            .catch(err => res.json(err));
    }
}

