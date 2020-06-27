const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  presentation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "presentations",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  slideNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
