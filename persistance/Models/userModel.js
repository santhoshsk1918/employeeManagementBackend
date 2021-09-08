var mongoose = require('mongoose');

var usersMongoModel = mongoose.Schema({
    name: {
      type: String
    },
    email: {
        type: String,
        index: true
    },
    type: {
        type: String
    },
    mobile:{
        type: String,
        index: true
    },
    password: {
        type: String
    },
    refreshToken: {
        type: String
    },
    refreshIdentifier : {
        type: String,
        index: true
    },
    googleOnlyLogin: {
        type: Boolean
    },
    profileImage: {
        type: String
    }
})

module.exports = Users = mongoose.model("User", usersMongoModel);