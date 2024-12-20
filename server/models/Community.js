const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },
    communityPosts: {
        type: Array,
        required: false,
    },
    communityMembers: {
        type: Array,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    restriction: {
        type: Boolean,
        required: false,
    },
    imageString: {
        type: String,
        required: false,
    },
    


});

module.exports = mongoose.model('Community', communitySchema,'Community')