var mongoose = require('mongoose');

var branchMongoModel = mongoose.Schema({
    branch: {
      type: String
    },
    branchKey: {
        type: String,
        index: true
    },
    zone: {
        type: String
    },
    region: {
        type: String
    }
})

module.exports = Branches = mongoose.model("Branches", branchMongoModel);