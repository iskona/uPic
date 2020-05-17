const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Image Schema
const ImageSchema = new Schema({
    owner:{
        type: String,
        required : true
    },
    contestId:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    graded:
    {
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:0
    }
    /*
    owner
    contest_id
    s3Url

    */

});

module.exports = Image = mongoose.model("image",ImageSchema);