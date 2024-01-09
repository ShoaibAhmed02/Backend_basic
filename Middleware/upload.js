const multer = require("multer");
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        console.log("File information is : ", file)
        if (file.fieldname == "file") {
          cb(null, "./uploads");
        } else if (file.fieldname == "text") {
          cb(null, "../uploads");
        }
      } catch (error) {
        cb(error, null);
      }
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + (file.originalname)
      );
    },
  });
  
  const upload = multer({ storage: storage });

  module.exports = {upload}