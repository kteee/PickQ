const express = require("express");
const { check } = require("express-validator");

const quizController = require("../controllers/quiz-controller");

const router = express.Router();

router.get("/", quizController.getQuizzes);

router.get("/:qid", quizController.getQuizById);

router.post(
  "/result",
  [
    check("quizId").notEmpty(),
    check("userId").notEmpty(),
    check("score").notEmpty(),
    check("total").notEmpty(),
  ],
  quizController.submitResult
);

router.get("/result/:rid", quizController.getQuizResultById);

module.exports = router;
