const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./server/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    req.fileValidationError = "File must be in PDF format";
    cb(null, false);
  }
};

module.exports = multer({
  storage: storage,
  limits: 1024 * 1024 * 10,
  fileFilter: fileFilter,
});
