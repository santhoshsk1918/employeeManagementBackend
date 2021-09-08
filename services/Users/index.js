let userDao = require("../../persistance/userDao");
let bcrypt = require("bcryptjs");
let { UserException } = require("../../routes/Utils/error");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
const { v4: uuidv4 } = require("uuid");

const secret_string = process.env.secret;

module.exports.getUserOnEmail = async (email) => {
  return userDao.getUserOnEmail(email);
};

module.exports.getUserOnId = async (id) => {
  return userDao.getUserOnId(id);
};

module.exports.saveUser = async (user) => {
  console.log("Saving User", user);
  try {
    const uuId = uuidv4();
    // Hashing the password
    console.log(typeof user.password !== "undefined" ? "123" : "4");

    let hashedPassword =
      typeof user.password !== "undefined"
        ? await hashUserPassword(user.password)
        : null;

    let refreshToken = generateJWTToken({ uuId }, "180d");

    user.password = hashedPassword;
    console.log(hashedPassword, user.password);
    user.refreshIdentifier = uuId;
    user.refreshToken = refreshToken;

    let currentUser = await userDao.getUserOnUsername(
      user.mobile || user.email
    );

    if (currentUser) {
      user = {
        ...currentUser,
        ...user,
      };
    }

    user.type = user.type ? user.type : "User";

    await userDao.saveUser(user);

    let savedUser = await userDao.getUserOnMobile(user.mobile);

    savedUser.accessToken = generateJWTToken(
      { id: savedUser._id, date: Date.now(), type: savedUser.type },
      "12h"
    );
    delete savedUser.password;

    return savedUser;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports.validateGoogleUser = async (user) => {
  try {
    let { googleToken } = user;

    let resp = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.OAUTH_CLIENT_ID,
    });

    const { email_verified, name, email, picture } = resp.payload;
    if(email_verified){
      let saveUser = await this.saveUser({
        name,
        email: email,
        profileImage: picture
      });
      console.log(saveUser);
      return saveUser;
    }else {
      throw new UserException("Email not verified", "Validation", 500)
    }
    
  } catch (err) {
    throw new Error(err);
  }
};

const comparePassword = (userDraft, user) => {
  return new Promise((resolve, reject) => {
    console.log(user, userDraft);
    if (user) {
      bcrypt.compare(userDraft.password, user.password, function (err, res) {
        if (err) {
          console.error("Error Received in compare password", err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    } else {
      resolve(false);
    }
  });
};

const generateJWTToken = (data, expiresIn = "12h") => {
  return jwt.sign(
    {
      data,
    },
    secret_string,
    { expiresIn }
  );
};

module.exports.validateUser = async (user) => {
  let { userName } = user;
  try {
    let currentUser = await userDao.getUserOnMobile(userName);
    if (currentUser) {
      if (await comparePassword(user, currentUser)) {
        currentUser.accessToken = generateJWTToken(
          { id: currentUser._id, date: Date.now(), type: currentUser.type },
          "12h"
        );
        return currentUser;
      } else {
        throw new UserException("Username or Password wrong", "Validation");
      }
    } else {
      throw new UserException("Username or Password wrong", "Validation");
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getAccessToken = async (user) => {
  let { refreshToken } = user;
  try {
    let decoded = jwt.verify(refreshToken, secret_string);
    let { uuId } = decoded.data;
    console.log(uuId);
    let user = await userDao.getUserOnRefreshIdentifier(uuId);
    if (user) {
      user.accessToken = generateJWTToken(
        { id: user._id, date: Date.now(), type: user.type },
        "12h"
      );
      return user;
    } else {
      throw new UserException("No User for RefreshToken", "Validation", 500);
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const hashUserPassword = async (passsword) => bcrypt.hashSync(passsword);
