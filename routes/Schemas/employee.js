const yup = require("yup");
require('yup-phone');

const createEmployee = yup.object({
    body: yup.object({
        name: yup.string().min(2).required('Name is Requried'),
        designation: yup.string().required("Please Enter Designation")
    })
});

const createDesignation = yup.object({
    body: yup.object({
        designation: yup.string().min(2).required('Please Enter Designation'),
        designationKey: yup.string(),
    })
});

const createBranch = yup.object({
    body: yup.object({
        branch: yup.string().min(2).required('Please Enter Designation'),
        branchKey: yup.string(),
        region: yup.string().required("Region is requried"),
        zone: yup.string().required("Zone is requried")
    })
});

const fileUpload = yup.object({
    body: yup.object({
        reference: yup.string().required("No Reference found"),
        fileType: yup.string()
    })
});

module.exports = {
    createDesignation,
    createEmployee,
    createBranch,
    fileUpload
}