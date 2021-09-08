let employeeDao = require("../../persistance/employeeDao");
let { UserException } = require("../../routes/Utils/error");
require("dotenv").config();

module.exports.saveEmployee = (employeeDraft) => {
    console.log(employeeDraft)
    return employeeDao.saveEmployee(employeeDraft);
}

module.exports.saveDesignation = (designationDraft) => {
    return employeeDao.saveDesignation(designationDraft);
}

module.exports.saveBranch = (branchDraft) => {
    return employeeDao.saveBranch(branchDraft);
}

module.exports.getDesignationList = () => {
    return employeeDao.getDesignationList();
}

module.exports.getBranchList = () => {
    return employeeDao.getBranchList();
}

module.exports.getEmployeeList = () => {
    return employeeDao.getEmployeeList();
}

module.exports.getEmployeeOnEmpNo = (empno) => {
    return employeeDao.getEmployeeOnEmpNo(empno);
}