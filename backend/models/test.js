const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 퀴즈 질문
const quizQuestionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: true },
  },
  { _id: false }
);

// 심리테스트 질문
const psytestQuestionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    scores: [{ type: Number, required: true }],
  },
  { _id: false }
);

// 심리테스트 결과
const psytestResultSchema = new Schema(
  {
    minScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    resultType: { type: String, required: true },
    img: { type: String },
    description: { type: String },
  },
  { _id: false }
);

// 테스트 공통
const testSchema = new Schema(
  {
    shortId: { type: String, required: true, unique: true },
    category: { type: String, enum: ["quiz", "psytest"], required: true },
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: String },
    image: { type: String },

    // 퀴즈
    answerType: {
      type: String,
      enum: ["multipleChoice", "shortAnswer"],
    },
    quizQuestions: [quizQuestionSchema],

    // 심리테스트
    psytestQuestions: [psytestQuestionSchema],
    psytestResults: [psytestResultSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
