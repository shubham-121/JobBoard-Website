const multer = require("multer");

function uploadResume() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "/uploads");
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage });

  //   return res.status(200).json({ message: "Resume reached here" });
}

module.exports = uploadResume;
