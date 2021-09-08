var express = require("express");
var router = express.Router();
var { authenticate, authenticateAdmin } = require("../services/Authentication");
var {
  createEmployee,
  createDesignation,
  createBranch,
} = require("./Schemas/employee");
var { validate } = require("../services/Validation");
const { APIERROR } = require("../routes/Utils");
const csv = require("csv-parse");
require("dotenv").config();
var employeeService = require("../services/Employee");
var { saveFile } = require("../routes/Utils");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post(
  "/createEmployee",
  authenticateAdmin,
  validate(createEmployee),
  async (req, res, next) => {
    try {
      const { empno, profileImageName = null } = req.body;

      const ext = req.files ? req.files.profileImage.name.split(".").pop() : "";
      let fileName = req.files ? `${empno}_${Date.now()}.${ext}` : null;
      let profileImagePath = req.files ? await saveFile(req.files.profileImage, "Profile", fileName) : null;
      let saveEmployee = await employeeService.saveEmployee({
        ...req.body,
        ...(req.files && {profileImagePath}),
        ...(req.files && {profileImageName: fileName}) 
      });
      res.send(saveEmployee);
      res.end();
    } catch (err) {
      APIERROR(res, err);
    }
  }
);

router.get("/getEmployeeList", authenticateAdmin, async (req, res, next) => {
  try {
    let employeeList = await employeeService.getEmployeeList(req.body);
    res.send(employeeList);
    res.end();
  } catch (err) {
    APIERROR(res, err);
  }
});

router.post(
  "/createDesignation",
  authenticateAdmin,
  validate(createDesignation),
  async (req, res, next) => {
    try {
      let savedDesignation = await employeeService.saveDesignation(req.body);
      res.send(savedDesignation);
      res.end();
    } catch (err) {
      APIERROR(res, err);
    }
  }
);

router.post(
  "/createBranch",
  authenticateAdmin,
  validate(createBranch),
  async (req, res, next) => {
    try {
      console.log(req.body);
      let savedBranch = await employeeService.saveBranch(req.body);
      res.send(savedBranch);
      res.end();
    } catch (err) {
      APIERROR(res, err);
    }
  }
);

router.get("/getDesignationList", authenticateAdmin, async (req, res, next) => {
  try {
    let designationList = await employeeService.getDesignationList();
    res.send(designationList);
    res.end();
  } catch (err) {
    APIERROR(res, err);
  }
});

router.get("/getBranchList", authenticateAdmin, async (req, res, next) => {
  try {
    let branchList = await employeeService.getBranchList();
    res.send(branchList);
    res.end();
  } catch (err) {
    APIERROR(res, err);
  }
});

module.exports = router;
