//3rd party
const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");

//built in modules
const fs = require("fs");

//middleware
const auth = require("./../../middleware/auth");
const upload = require("./../../middleware/fileUpload");

//other files:
const helperFunctions = require("../../helpers/helperFunctions");
const Presentation = require("./../../models/Presentation");

//init
const router = new express.Router();
router.use(cookieParser());

/*======================================
CREATE PRESENTATION
@Route: /api/presentations/create
@Method: POST
@Access: Private
@Response: Presentation
@Required request data: title, file
======================================*/
router.post("/create", auth, upload.single("file"), async (req, res) => {
  try {
    if (req.fileValidationError) {
      return helperFunctions.sendCustom400Error(res, req.fileValidationError);
    }

    const user_id = req.user;
    const { title } = req.body;
    const newPresentation = new Presentation({
      title: title,
      user_id: user_id,
      filePath: req.file.path,
    });
    await newPresentation.save();
    res.status(200).send(newPresentation);
  } catch (error) {
    helperFunctions.sendServerErrorMsg;
  }
});

/*======================================
DELETE PRESENTATION
@Route: /api/presentations/delete
@Method: DELETE
@Access: Private
@Response: none
@Required request data: presentation_id
======================================*/
router.delete("/delete", auth, async (req, res) => {
  try {
    const { presentation_id } = req.body;
    const presentation = await Presentation.findById(presentation_id);
    if (!presentation) {
      return helperFunctions.custom404Error(res, "Presentation not found");
    }
    if (presentation.user_id.toString() !== req.user.toString()) {
      return helperFunctions.sendCustom400Error(
        res,
        "Your are not allowed to delete this presentation!"
      );
    }
    await fs.unlink(presentation.filePath, (error) => {
      return helperFunctions.sendServerErrorMsg(res, error);
    });
    await Presentation.deleteOne({ _id: presentation_id }, (error, result) => {
      if (error) {
        return res.status(500).send({
          error: [
            { msg: "Sorry, something went wrong. Please try again later." },
          ],
        });
      } else {
        res.status(200).send("Presentation deleted successfully");
      }
    });
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

/*======================================
UPDATE PRESENTATION TITLE
@Route: /api/presentations/update
@Method: PATCH
@Access: Private
@Response: Presentation
@Required request data: presentation_id, newTitle
======================================*/
router.patch("/update", auth, async (req, res) => {
  try {
    const { presentation_id, newTitle } = req.body;
    const presentation = await Presentation.findById(presentation_id);

    if (presentation.user_id.toString() !== req.user._id.toString()) {
      return helperFunctions.sendCustom400Error(
        res,
        "Your are not allowed to delete this presentation!"
      );
    }

    if (presentation.title === newTitle) {
      return helperFunctions.sendCustom400Error(
        res,
        "Sorry, you didn't change the title"
      );
    }

    presentation.title = newTitle;
    await presentation.save();

    res.status(200).send(presentation);
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error);
  }
});

/*======================================
GET ONE PRESENTATION OF USER
@Route: /api/presentations/getone
@Method: GET
@Access: Private
@Response: Presentation
@Required request data: presentation_id
======================================*/
router.get("/getone", auth, async (req, res) => {
  try {
    const user_id = req.user._id;
    const { presentation_id } = req.body;
    const presentation = await Presentation.findById(presentation_id);

    if (!presentation) {
      return helperFunctions.custom404Error(res, "Presentation not found");
    }

    if (user_id.toString() !== presentation.user_id.toString()) {
      return helperFunctions.sendCustom400Error(
        res,
        "You are not allowed to access this presentation"
      );
    }

    res.status(200).send(presentation);
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error);
  }
});

/*======================================
FIND ALL PRESENTATIONS OF ONE USER
@Route: /api/presentations/getall
@Method: GET
@Access: Private
@Response: Array of Presentations
@Required request data: none
======================================*/
router.get("/getall", auth, async (req, res) => {
  try {
    const user_id = req.user._id;
    const presentations = await Presentation.find({ user_id });

    if (!presentations) {
      return helperFunctions.custom404Error(
        res,
        "Your currently have no presentations saved."
      );
    }

    res.status(200).send(presentations);
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error);
  }
});
module.exports = router;
