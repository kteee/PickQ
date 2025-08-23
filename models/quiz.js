const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: true },
  },
  { _id: false }
);

const quizSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: String },
    image: { type: String },
    answerType: {
      type: String,
      enum: ["objective", "subjective"],
      required: true,
    },
    questions: { type: [questionSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
