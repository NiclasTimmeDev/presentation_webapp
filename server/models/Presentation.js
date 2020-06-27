const mongoose = require("mongoose");

const presentationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
});

const Presentation = mongoose.model("Presentation", presentationSchema);

module.exports = Presentation;
