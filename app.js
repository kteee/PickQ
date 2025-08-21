const express = require("express");
const quizRoutes = require("./routes/quiz-routes");

const app = express();

app.use("/api/quiz", quizRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "알 수 없는 오류가 발생했습니다." });
});

//app.use(express.urlencoded({ extended: false }));

app.listen(5000);
