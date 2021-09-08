const yup = require("yup");
require('yup-phone');

const createUser = yup.object({
    body: yup.object({
        name: yup.string().min(2).required('Name is Requried'),
        email: yup.string().email(),
        mobile: yup.string().phone().required('Mobile Number is Requried'),
        password: yup.string().min(6).max(28).required('Please enter password'),
        type: yup.string().oneOf(["Admin", "User"])
    })
});

const loginUser = yup.object({
    body:  yup.object({
        userName: yup.string().required("Username or Password is wrong"),
        password: yup.string().required("Username or Password is wrong")
    })
});

const googleLogin = yup.object({
    body: yup.object({
        googleToken: yup.string().required("Google Token is Requried")
    })
});

const refreshTokenLogin = yup.object({
    body: yup.object({
        refreshToken: yup.string().required("Google Token is Requried")
    })
})

module.exports = {
    createUser,
    loginUser,
    googleLogin,
    refreshTokenLogin
}