const express = require("express");
const { check } = require("express-validator");

const quizController = require("../controllers/quiz-controller");

const router = express.Router();

router.get("/", quizController.getQuizzes);

router.get("/:qid", quizController.getQuizById);

router.post(
  "/:qid/result",
  [check("userId").notEmpty(), check("type").notEmpty()],
  quizController.submitResult
);

module.exports = router;
