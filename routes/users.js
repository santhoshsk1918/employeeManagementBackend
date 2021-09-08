var express = require("express");
var router = express.Router();
var userService = require("../services/Users");
var { authenticate, authenticateAdmin } = require("../services/Authentication");
var { createUser, loginUser, googleLogin, refreshTokenLogin } = require("./Schemas/user");
var { validate } = require("../services/Validation");
const { APIERROR } = require("../routes/Utils");

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/:id?", authenticate, (req, res) => {
  let id = req.params.id;
});

router.post("/", validate(createUser), async (req, res) => {
  try {
    let saveUser = await userService.saveUser(req.body);
    res.send(sanatizeUser(saveUser));
    res.end();
  } catch (err) {
    APIERROR(res, err);
  }
});

router.post("/signIn", validate(loginUser), async (req, res) => {
  try {
    let saveUser = await userService.validateUser(req.body);
    res.send(sanatizeUser(saveUser));
    res.end();
  } catch (err) {
    APIERROR(res, err);
  }
});

router.post("/googleLogin", validate(googleLogin), async (req, res) => {
  try{
    let saveUser = await userService.validateGoogleUser(req.body);
    res.send(sanatizeUser(saveUser));
    res.end();
  } catch (err) {
    APIERROR(res, err);
  }
})

router.post("/getAccessToken", validate(refreshTokenLogin), async (req, res) => {
  try{
    let saveUser = await userService.getAccessToken(req.body);
    res.send(sanatizeUser(saveUser));
    res.end();
  } catch (err) {
    APIERROR(res, err);
  }
})

const sanatizeUser = (user) => {
  delete user.password;
  delete user.refreshIdentifier;
  console.log("User", user);
  return user
}

module.exports = router;
