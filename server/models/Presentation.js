const mongoose = require("mongoose");

const presentationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  file: {
    type: Buffer,
    required: true,
  },
});

const Presentation = mongoose.model("Presentation", presentationSchema);

module.exports = Presentation;
