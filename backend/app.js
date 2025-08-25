const express = require("express");
const mongoose = require("mongoose");

const quizRoutes = require("./routes/quiz-routes");
const commentRoutes = require("./routes/comment-routes");
const userRoutes = require("./routes/user-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(express.json());

app.use("/api/quiz", quizRoutes);

app.use("/api/comment", commentRoutes);

app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("해당 경로가 존재하지 않습니다.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "알 수 없는 오류가 발생했습니다." });
});

mongoose
  .connect(
    "mongodb+srv://kteee:bQMH9t84D35fkv7q@cluster0.cxqro4z.mongodb.net/pickq?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
