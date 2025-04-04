//multer storage config file

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, __dirname + "/uploads");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.mimetype.split("/")[1]; //check file type (file extension)
    return cb(null, Date.now() + "." + fileExtension);
  },
});

//   return res.status(200).json({ message: "Resume reached here" });

const upload = multer({ storage });

module.exports = upload;
