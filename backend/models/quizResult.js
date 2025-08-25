const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizResultSchema = new Schema(
  {
    quizId: { type: mongoose.Types.ObjectId, required: true, ref: "Quiz" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizResult", quizResultSchema);
