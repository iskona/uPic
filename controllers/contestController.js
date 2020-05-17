const db = require("../models");

// Defining methods for the contestsController
module.exports = {
    findAll: function (req, res, next) {
        console.log("in contest findAll")
        console.log(req.user);
        console.log("=========================")
        db.Contest
            .find(req.query)
            .then(data => {
                console.log(data);
                res.json(data);
            })
            .catch(err => console.log(err));
    }
}