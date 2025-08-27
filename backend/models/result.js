const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    testId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Test",
    },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["quiz", "psytest"], required: true },
    score: { type: Number },
    total: { type: Number },
    resultType: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
