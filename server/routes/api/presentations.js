//3rd party
const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");

//middleware
const auth = require("./../../middleware/auth");
const upload = require("./../../middleware/fileUpload");

//other files:
const helperFunctions = require("../../helpers/helperFunctions");

//init
const router = new express.Router();
router.use(cookieParser());

/*======================================
CREATE PRESENTATION
@Route: /api/users/register
@Method: POST
@Access: Public
@Response: token
@Required request data: username, email, password1, password2
======================================*/
router.post("/create", auth, upload.single("file"), async (req, res) => {
  try {
    if (req.fileValidationError) {
      helperFunctions.sendCustom400Error(res, req.fileValidationError);
    }
    res.status(200).send("Image uploaded");
  } catch (error) {
    helperFunctions.sendServerErrorMsg;
  }
});

module.exports = router;
