const express = require("express");
const mongoose = require("mongoose");

const testsRoutes = require("./routes/tests-routes");
const commentsRoutes = require("./routes/comments-routes");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/tests", testsRoutes);

app.use("/api/comments", commentsRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("요청 경로가 존재하지 않습니다.", 404);
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
