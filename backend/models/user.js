const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    googleId: { type: String, unique: true, sparse: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, minlength: 6 },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
