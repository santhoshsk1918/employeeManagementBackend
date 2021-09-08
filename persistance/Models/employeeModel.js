var mongoose = require("mongoose");

var employeeMongoModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
    gender: {
      type: String,
      index: true,
    },
    designation: {
      type: String,
      index: true,
    },
    branch: {
      type: String,
      index: true,
    },
    adhar: {
      type: String,
    },
    pfno: {
      type: String,
    },
    uanno: {
      type: String,
    },
    empno: {
      type: String,
      index: true,
    },
    profileImagePath: {
      type: String,
    },
    profileImageName: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    empMobile: {
      type: String,
    },
    dob: {
      type: String,
    },
    contractEmployee: {
      type: Boolean
    }
  },
  { timespamp: true }
);

module.exports = Employees = mongoose.model("Employees", employeeMongoModel);
