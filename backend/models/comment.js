const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    quizId: { type: mongoose.Types.ObjectId, required: true, ref: "Quiz" },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
