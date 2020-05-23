const db = require("../models");
const aws = require('aws-sdk');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

//defining methods for the imagesController
module.exports = {
    /*method to upload an image 
    uploadImage: */
    saveImage : function (req, res ){
        console.log("*******Image controller ************");
        console.log(req.body)
        db.Image    
            .create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(422).json()) ;
    },
    getImageDetails: function(req, res){
        db.Image
            .find({contestId: req.params.contestId})
            .then(dbImages => res.json(dbImages))
            .catch(err => console.log(err));
    },
    checkUserParticipation: function(req, res ){
        db.Image    
            .find({owner: req.params.user, contestId: req.params.contestId})
            .then(dbImages => res.json(dbImages))
            .catch(err => console.log(err));
    },
    updateRating: function(req, res){
        //search for the combination of image id    
        console.log('--- ')
        console.log(req.body)
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
                .then( updatedData => res.json(updatedData))
                .catch(err => res.status(422).json(err));
    },
    getImageRating: function(req, res){
        console.log(req.params.img_id + "  "+ req.params.contest_id +"  "+req.params.user);
        db.Rating
            .find({
                image_id: req.params.img_id,
                contest_id: req.params.contest_id,
                user: req.params.user
            })
            .then( dbData => res.json(dbData))
                .catch(err => res.status(422).json(err));
    }

}