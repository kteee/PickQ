const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    scores: [{ type: Number, required: true }],
  },
  { _id: false }
);

const resultSchema = new Schema(
  {
    minScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    resultType: { type: String, required: true },
    img: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const psytestSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: String },
    image: { type: String },
    questions: { type: [questionSchema], required: true },
    results: { type: [resultSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Psytest", psytestSchema);
