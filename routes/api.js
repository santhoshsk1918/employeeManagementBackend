var express = require("express");
var router = express.Router();
var { validate } = require("../services/Validation");
const { APIERROR } = require("../routes/Utils");
const csv = require("csv-parse");
require("dotenv").config();
var employeeService = require("../services/Employee");
var { saveFile } = require("../routes/Utils");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/files/download", async (req, res, next) => {
  let { reference, type = "" } = req.query;
  if(type.toLowerCase() === "profile"){
    let employee = await employeeService.getEmployeeOnEmpNo(reference);
    if(employee){
      let fileName = employee.profileImageName;
      // let imagePath = path.join(process.env.FileSavePath, pathExtention, fileName)
      // console.log(imagePath);
      res.download(imagePath)
    }else {
      APIERROR(res, "No File Found");
    }
  }
})

// router.post('/bulk/branch', authenticateAdmin, function(req, res, next) {
//     let file = req.files.file;
//     if(file.name.split(".").pop() === "csv"){
//         // Do a CSV PROCESSOR
//     }else {
//         APIERROR(res, {message: "Not a CSV", type: "Validation"})
//     }
// });

// router.post('/bulk/branch', authenticateAdmin, function(req, res, next) {
//     let file = req.files.file;
//     if(file.name.split(".").pop() === "csv"){

//     }else {
//         APIERROR(res, {message: "Not a CSV", type: "Validation"})
//     }
// });

module.exports = router;
