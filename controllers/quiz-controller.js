const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Quiz = require("../models/quiz");

// GET /api/quiz
const getQuizzes = async (req, res, next) => {
  let quizzes;
  try {
    quizzes = await Quiz.find({}, "-answerType -questions");
  } catch (err) {
    const error = new HttpError("퀴즈 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  res.json({
    quizzes: quizzes.map((quiz) => quiz.toObject({ getters: true })),
  });
};

const getQuizById = (req, res, next) => {
  // const quizId = req.params.qid;
  // const quiz = DUMMY_QUIZ.find((q) => q.id === quizId);
  // if (!quiz) {
  //   return next(new HttpError("해당 퀴즈가 존재하지 않습니다.", 404));
  // }
  // res.json(quiz);
};

const submitResult = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   throw new HttpError("유효하지 않은 입력 데이터를 전달했습니다.", 422);
  // }
  // const quizId = req.params.qid;
  // const { user_id, type, score, total, result_type, description, submit_date } =
  //   req.body;
  // if (type === "quiz") {
  //   if (
  //     score === undefined ||
  //     total === undefined ||
  //     typeof score !== "number" ||
  //     typeof total !== "number"
  //   ) {
  //     throw new HttpError("유효하지 않은 입력 데이터를 전달했습니다.", 422);
  //   }
  // }
  // if (type === "test") {
  //   if (!result_type?.trim() || !description?.trim()) {
  //     throw new HttpError("유효하지 않은 입력 데이터를 전달했습니다.", 422);
  //   }
  // }
  // const submittedResult = {
  //   id: uuidv4(),
  //   quiz_id: quizId,
  //   user_id,
  //   type,
  //   score,
  //   total,
  //   result_type,
  //   description,
  //   submit_date,
  // };
  // DUMMY_RESULT.push(submittedResult);
  // res.status(201).json({ submittedResult: submittedResult });
};

exports.getQuizzes = getQuizzes;
exports.getQuizById = getQuizById;
exports.submitResult = submitResult;
