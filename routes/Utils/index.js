const path = require("path");
module.exports.APIERROR = (res, err) => {
  console.error(err);
  let { userError } = err;
  if (userError) {
    let {
      type,
      message = "Internal Server Error",
      statusCode = 500,
    } = err;
    res.status(statusCode).json({
      ...(type && {
        type,
      }),
      message,
    });
  } else {
    res
      .status(500)
      .json({
        type: "Internal Server Error",
        message: "Internal Server Error",
        status: 500,
        err
      });
  }
};

module.exports.saveFile = (files, pathExtention, fileName) => {
  return new Promise((resolve, reject) => {
    let filePath = path.join(process.env.FileSavePath, pathExtention, fileName)

    files.mv(filePath, function (err) {
      if (err)
        throw new Error(err);
      resolve(path.join(filePath));
    });
  });
};
