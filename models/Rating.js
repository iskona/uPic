const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ContestSchema = new Schema({
//image id
image_id:{
    type: String,
    required: true
},
//contest id
contest_id:{
    type: String,
    required: true
},
//user email
user:{
    type: String,
    required: true
},
//rating
rating:{
    type:Number,
    required: true
}
});

module.exports =  Rating = mongoose.model("rating", ContestSchema);