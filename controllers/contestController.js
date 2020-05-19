const db = require("../models/");

// Defining methods for the contestsController
module.exports = {
    findAll: function (req, res) {
        db.Contest
            .then(data => {
                console.log(data);
                res.json(data);
            })
            .catch(err => console.log(err));
    },

    //Post new Contest
     create: function (req, res) {
        console.log(req.body);
        var ownerEmail = req.user.email;
        if(!req.user)
        {
            return res.status(400).send({ email: "User Does not exists." });
        }

        db.Contest
            .create({
                owner: ownerEmail,
                title: req.body.title,
                duedate: req.body.duedate,
                description: req.body.description,
                category: req.body.category
            }).then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(400).json(err);
            });
        //  const newContest = new Contest({
        //     title: req.body.title,
        //         duedate : req.body.duedate,
        //         description : req.body.description,
        //         category :req.body.category   
        // })
        // newContest.save().then(data => {
        //     console.log(data)
        //     res.json(data)})
        // .catch(err => console.log(err));

    }
}


