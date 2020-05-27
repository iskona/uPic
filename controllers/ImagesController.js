const db = require("../models");
const aws = require('aws-sdk');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

//defining methods for the imagesController
module.exports = {
    /*method to upload an image 
    uploadImage: */
    saveImage: function (req, res) {
        db.Image
            .create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(422).json());
    },
    getImageDetails: function (req, res) {
        db.Image
            .find({ contestId: req.params.contestId })
            .sort({ rating: -1 })
            .then(dbImages => res.json(dbImages))
            .catch(err => console.log(err));
    },
    checkUserParticipation: function (req, res) {
        db.Image
            .find({ owner: req.params.user, contestId: req.params.contestId })
            .then(dbImages => res.json(dbImages))
            .catch(err => console.log(err));
    },
	updateRating: function (req, res) {
        //search for the combination of image id    
        db.Rating
            .findOneAndUpdate(
                {
                    image_id: req.body.image_id, contest_id: req.body.contest_id, user: req.body.user
                }, //filter
                {
                    rating: req.body.rating
                }, //update
                {
                    new: true,
                    upsert: true
                })
            .then(updatedData => res.json(updatedData))
            .catch(err => res.status(422).json(err));
    },
    getImagesUploadedByUser : function(req,res) {
        db.Image.aggregate([
            { $match: { owner: { $eq: req.user.email } } },
            {
                "$project": {
                    "contestId": {
                        "$toObjectId": "$contestId"
                    },
		            "thumbnailUrl":{"$toString": "$thumbnailUrl"},
		            "imageUrl":{"$toString": "$imageUrl"}
                }
            },
            {
                $lookup: {
                    from : "contests",
                    localField :"contestId",
                    foreignField : "_id",
                    as : "Contest"
                }
            }
        ]).then(data => res.json(data));
    },
    getImageRating: function (req, res) {
        console.log(req.params.img_id + "  " + req.params.contest_id + "  " + req.params.user);
        db.Rating
            .find({
                image_id: req.params.img_id,
                contest_id: req.params.contest_id,
                user: req.params.user
            })
            .then(dbData => res.json(dbData))
            .catch(err => res.status(422).json(err));
    },
    calcAverageRating: function (req, res) {
        console.log('--- contest id sent ');
        console.log(req.params.contest_id);
        db.Rating
            .find({ contest_id: req.params.contest_id })
            .then(dbImages => res.json(dbImages))
            .catch(err => res.json(err));
    },
    updateAvgRating: async function (req, res) {
        var contestId = req.body.contest_id;
        var ratings = req.body.ratingsArr;
        var key; var ids = [];
        for (let i = 0; i < ratings.length; i++) {
            for (key in ratings[i]) {
                ids.push(key)
            }
        }
        try {
            var updates = [];
            for (let i = 0; i < ids.length; i++) {
                console.log(`id[${i}] = ${ids[i]}`)
                var id = ids[i]
                console.log(`ratings[${i}] = ${ratings[i][id]}`)
                var updatePromise = db.Image.update(
                    {
                        _id: id, contestId: contestId
                    },
                    {
                        $set:
                        {
                            rating: ratings[i][id]
                        }
                    }
                );
                updates.push(updatePromise);
            }
            Promise.all(updates).then(function (results) {
                console.log(results);
                res.status(200).json();
            });

        } catch (err) {
            res.status(422).json(err);
        }
    }

}