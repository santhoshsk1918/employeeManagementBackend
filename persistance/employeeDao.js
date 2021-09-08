let designationModel = require("./Models/designationModel");
let branchModel = require("./Models/branchModel");
let employeeModel = require("./Models/employeeModel");

module.exports.saveDesignation = (designationDraft) => {
  return new Promise((resolve, reject) => {
    designationModel.updateOne(
      { designationKey: designationDraft.designationKey },
      designationDraft,
      { upsert: true },
      function (err, designation) {
        if (err) {
          reject(err);
        } else {
          resolve(designation);
        }
      }
    );
  });
};

module.exports.getDesignationList = () => {
  return new Promise((resolve, reject) => {
    designationModel.find(function(err, designationList) {
      if(err){
        reject(err);
      } else {
        resolve(designationList.length > 0 ? designationList : []);
      }
    }).lean();
  })
};

module.exports.saveBranch = (branchDraft) => {
  return new Promise((resolve, reject) => {
    branchModel.updateOne(
      { branchKey: branchDraft.branchKey },
      branchDraft,
      { upsert: true },
      function (err, branch) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(branch);
        }
      }
    );
  });
};

module.exports.getBranchList = () => {
  return new Promise((resolve, reject) => {
    branchModel.find(function(err, branchList) {
      if(err){
        reject(err);
      } else {
        resolve(branchList.length > 0 ? branchList : []);
      }
    }).lean();
  })
};

module.exports.saveEmployee = (employeeDraft) => {
  console.log(employeeDraft);
  return new Promise((resolve, reject) => {
    employeeModel.updateOne(
      { empno: employeeDraft.empno },
      employeeDraft,
      { upsert: true },
      function (err, employee) {
        if (err) {
          reject(err);
        } else {
          resolve(employee);
        }
      }
    );
  });
}

module.exports.getEmployeeList = () => {
  return new Promise((resolve, reject) => {
    employeeModel.find(function(err, employeeList) {
      if(err){
        reject(err);
      } else {
        resolve(employeeList.length > 0 ? employeeList : []);
      }
    }).lean();
  })
}

module.exports.getEmployeeOnEmpNo = (empno) => {
  return new Promise((resolve, reject) => {
    employeeModel.find( {empno }, function(err, employee) {
      if(err){
        reject(err);
      }else{ 
        resolve(employee.length > 0 ? employee[0] : null)
      }
    })
  })
}