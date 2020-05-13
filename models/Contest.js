const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ContestSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: "You must give your photo contest a title."
    },
    startdate: {
        type: Date,
        default: Date.now
    },
    duedate: {
        type: Date,
        required: "You must provide end date of the contest."
    },
    description: {
        type: String
    },
    category: {
        type: [String],
        required : true
    }
});

module.exports =  Contest = mongoose.model("contests", ContestSchema);