let userModel = require("./Models/userModel");

module.exports.saveUser = (user) => {
  return new Promise((resolve, reject) => {
    userModel.updateOne(
      { mobile: user.mobile },
      user,
      { upsert: true },
      function (err, user) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      }
    );
  });
};

module.exports.getUserOnMobile = (mobile) => {
    return new Promise((resolve, reject) => {
        userModel.find({mobile: mobile}, function(err, user){
            if(err){
                reject(err);
            }else {
                resolve(user.length > 0 ? user[0] : null);
            }
        }).lean()
    })
}

module.exports.getUserOnUsername = (userName) => {
  return new Promise((resolve, reject) => {
      userModel.find({$or: [{mobile: userName}, {email: userName}] }, function(err, user){
          if(err){
              reject(err);
          }else {
              resolve(user.length > 0 ? user[0] : null);
          }
      }).lean()
  })
}

module.exports.getUserOnRefreshIdentifier = (refreshIdentifier) => {
  return new Promise((resolve, reject) => {
      userModel.find({ refreshIdentifier }, function(err, user){
          if(err){
              reject(err);
          }else {
              console.log(user, refreshIdentifier);
              resolve(user.length > 0 ? user[0] : null);
          }
      }).lean()
  })
}

module.exports.getUserOnId = (id) => {
  return new Promise((resolve, reject) => {
      userModel.findById(id, function(err, user){
          if(err){
              reject(err);
          }else {
              resolve(user);
          }
      }).lean()
  })
}