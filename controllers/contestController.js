const db = require("../models");

// Defining methods for the contestsController
module.exports = {
    findAll: function (req, res) {
        db.Contest
            .then(data => {
                console.log(data);
                res.json(data);
            })
            .catch(err => console.log(err));
    }
}