const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communityPostCommentSchema = new Schema({
    

});

module.exports = mongoose.model('Community Post Comment', communityPostCommentSchema,'Community Post Comment')