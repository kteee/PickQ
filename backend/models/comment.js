const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    testId: { type: mongoose.Types.ObjectId, required: true, ref: "Test" },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    nickname: { type: String, required: true },
    content: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
