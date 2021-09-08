var mongoose = require('mongoose');

var designationsMongoModel = mongoose.Schema({
    designation: {
      type: String
    },
    designationKey: {
        type: String,
        index: true
    },
})

module.exports = Users = mongoose.model("Desingations", designationsMongoModel);