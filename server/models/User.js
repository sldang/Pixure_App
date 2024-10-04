const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: false,
     },
    lastName:{
        type: String,
        required: false,
    },
    nickname:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: false,
    },
    password:{
        type: String,
        required: false,
    },
    zipcode:{
        type: String,
        required: false,
    },
    friendsList: {
        type: String,
        required: false,
    },
    followList: {
        type: String,
        required: false,
    },
    karma: {
        type: String,
        required: false,
    },
    communityIDs: {
        type: String,
        required: false,
    },
    posts: {
        type: String,
        required: false,
    },
    age: {
        type: String,
        required: false,
    },
    searchTags: {
        type: String,
        required: false,
    },
    postAndFlagsTags: {
        type: String,
        required: false,
    },
    profilePic: {
        type: String,
        required: false,
    },
    parentAccount: {
        type: String,
        required: false,
    },
    parentAccountID: {
        type: String,
        required: false,
    },
    childAccount: {
        type: String,
        required: false,
    },
    childAccountID: {
        type: String,
        required: false,
    },

});

module.exports = mongoose.model('User', userSchema,'User')