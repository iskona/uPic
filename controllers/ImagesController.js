const db = require("../models");
const aws = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const mongoose = require("mongoose");
//import mongoose from 'mongoose';
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
        //list all images
        if(!req.user|| !req.user.email)
        {
            return res.status(400).send({ email: "User Does not exists." });
        }
        
        db.Image.find({ owner :req.user.email})
        .then (images => {
            var promises = [];
            images.forEach(image => {
                var promise = db.Contest.findById(image.contestId).then((contest) => {
                    return {image: image, contest: contest}
                })
                promises.push(promise);
            });
            return Promise.all(promises);
        })
        .then((values) => {
            var userContests = [];
            values.forEach(value => {
                userContests.push(value)
            })

            return res.json(userContests)
        })
        .catch(err => 
            {
                console.log(err);
                res.status(500).json(err)
            })
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