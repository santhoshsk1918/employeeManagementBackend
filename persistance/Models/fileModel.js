var mongoose = require('mongoose');

var fileMongoModel = mongoose.Schema({
    fileName: {
      type: String
    },
    fileDisplayName: {
        type: String
    },
    filePath: {
        type: String
    },
    reference: {
        type: String,
        index: true
    }
});

module.exports = Files = mongoose.model("Files", fileMongoModel);
