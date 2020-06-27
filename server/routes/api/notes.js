//3rd party
const express = require("express");
const cookieParser = require("cookie-parser");

//middleware
const auth = require("./../../middleware/auth");

//helpers
const helperfunctions = require("./../../helpers/helperFunctions");

//Models
const Presentation = require("./../../models/Presentation");
const User = require("./../../models/User");
const Note = require("../../models/Note");

//init
const router = new express.Router();
router.use(cookieParser());

/*======================================
CREATE OR UPDATE NOTE
@Route: /api/notes/create
@Method: POST
@Access: Private
@Response: Note
@Required request data: presentation_id, slideNumber, body
======================================*/
router.post("/create", auth, async (req, res) => {
  try {
    let { presentation_id, slideNumber, body } = req.body;
    slideNumber = parseInt(slideNumber);
    const user_id = req.user._id;

    if (!presentation_id || !slideNumber) {
      console.log("No presentation ID or SlideNumber provided");
      return helperfunctions.sendServerErrorMsg(res, {
        message: "Sorry, something went wrong. Please try again later.",
      });
    }
    if (!body) {
      return helperfunctions.sendCustom400Error(
        res,
        "Sorry, you note may note be empty."
      );
    }

    const existingNote = await Note.findOne({
      presentation_id,
      slideNumber,
      user_id,
    });

    if (existingNote) {
      existingNote.body = body;
      await existingNote.save();
      return res.status(200).send(existingNote);
    }

    const presentation = await Presentation.findById(presentation_id);
    if (!presentation) {
      return helperfunctions.custom404Error(
        res,
        "Sorry, we could not find that presentation"
      );
    }
    if (presentation.user_id.toString() !== user_id.toString()) {
      return helperfunctions.sendCustom400Error(
        res,
        "You are not allowed to create a note for this presentation."
      );
    }

    const newNote = new Note({
      presentation_id,
      user_id,
      body,
      slideNumber,
    });

    res.status(201).send(newNote);

    await newNote.save();
  } catch (error) {
    return helperfunctions.sendServerErrorMsg(res, error);
  }
});

/*======================================
DELETE NOTE
@Route: /api/notes/delete
@Method: DELETE
@Access: Private
@Response: none
@Required request data: note_id
======================================*/
router.delete("/delete", auth, async (req, res) => {
  try {
    const user_id = req.user._id;
    const { note_id } = req.body;

    const note = await Note.findById(note_id);
    if (!note) {
      return helperfunctions.custom404Error("Sorry, note could not be found.");
    }
    if (note.user_id.toString() !== user_id.toString()) {
      return helperfunctions.sendCustom400Error(
        "You are not allowed to delete this comment."
      );
    }

    await Note.deleteOne({ _id: note_id });
    return res.status(200).send("Note deleted successfully");
  } catch (error) {
    helperfunctions.sendServerErrorMsg(res, error);
  }
});

/*======================================
GET ALL NOTES OF ONE PRESENTATION
@Route: /api/notes/all
@Method: GET
@Access: Private
@Response: Array of Notes
@Required request data: presentation_id
======================================*/
router.get("/all", auth, async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await User.findById(user_id);
    const { presentation_id } = req.body;
    const notes = await Note.find({ presentation_id });

    if (!user) {
      return helperfunctions.custom404Error(res, "User not found");
    }
    if (!notes) {
      return helperfunctions.custom404Error(
        "There are not yet any notes for your presentation"
      );
    }

    const areAllNotesFromCorrectUser = notes.every((note) => {
      return note.presentation_id.toString() === presentation_id.toString();
    });

    if (!areAllNotesFromCorrectUser) {
      return helperfunctions.sendCustom400Error(
        res,
        "You are not allowed to access these notes."
      );
    }

    res.status(200).send(notes);
  } catch (error) {
    return helperfunctions.sendServerErrorMsg(res, error);
  }
});

/*======================================
GET ONE NOTE OF A PRESENTATION BY SLIDE NUMBER
@Route: /api/notes/one
@Method: GET
@Access: Private
@Response: NOTE
@Required request data: presentation_id, slideNumber
======================================*/
router.get("/one", auth, async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await User.findById(user_id);

    const { presentation_id, slideNumber } = req.body;
    const presentation = await Presentation.findById(presentation_id);

    if (!user) {
      return helperfunctions.custom404Error(res, "User not found");
    }

    if (!presentation_id || !slideNumber) {
      return helperfunctions.sendCustom400Error(
        res,
        "Please provide a Presentation and a slide number"
      );
    }

    if (presentation.user_id.toString() !== user_id.toString()) {
      return helperfunctions.sendCustom400Error(
        res,
        "You are not allowed to access this presentation"
      );
    }

    const note = await Note.findOne({
      presentation_id,
      slideNumber,
    });

    if (!note) {
      return helperfunctions.custom404Error(
        res,
        "Sorry, the note could not be found."
      );
    }

    res.status(200).send(note);
  } catch (error) {
    return helperfunctions.sendServerErrorMsg(res, error);
  }
});
module.exports = router;
