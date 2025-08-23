const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const psytestResultSchema = new Schema(
  {
    psytest: { type: mongoose.Types.ObjectId, required: true, ref: "Psytest" },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PsytestResult", psytestResultSchema);
