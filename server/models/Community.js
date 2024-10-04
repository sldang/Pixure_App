const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema({
    

});

module.exports = mongoose.model('Community', communitySchema,'Community')