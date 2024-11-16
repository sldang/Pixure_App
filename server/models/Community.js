const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema({
    
//added temporary components 
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
//end

});

module.exports = mongoose.model('Community', communitySchema,'Community')