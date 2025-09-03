require("./middleware/passport");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const testsRoutes = require("./routes/tests-routes");
const commentsRoutes = require("./routes/comments-routes");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   next();
// });

app.use(
  cors({
    origin: "https://pickq.im",
    credentials: true,
  })
);

app.use(express.json());

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

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cxqro4z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
