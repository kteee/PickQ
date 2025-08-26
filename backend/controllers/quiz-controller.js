const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Quiz = require("../models/quiz");
const User = require("../models/user");
const QuizResult = require("../models/quizResult");

// GET /api/quiz
const getQuizzes = async (req, res, next) => {
  // 퀴즈 목록 조회
  let quizzes;
  try {
    quizzes = await Quiz.find({}, "-answerType -questions");
  } catch (err) {
    const error = new HttpError("퀴즈 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  res.json({
    data: quizzes.map((quiz) => quiz.toObject({ getters: true })),
  });
};

// GET /api/quiz/:qid
const getQuizById = async (req, res, next) => {
  const quizId = req.params.qid;
  // 퀴즈 조회
  let quiz;
  try {
    quiz = await Quiz.findOne({ id: quizId });
    if (!quiz) {
      const error = new HttpError("해당 퀴즈가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("퀴즈 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  res.json({ data: quiz.toObject({ getters: true }) });
};

// POST /api/quiz/result
const submitResult = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "유효하지 않은 입력 데이터를 전달했습니다.",
      422
    );
    return next(error);
  }

  const { quizId, userId, score, total } = req.body;
  const submittedResult = new QuizResult({
    quizId,
    userId,
    score,
    total,
  });

  // 퀴즈 존재 여부 확인
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      const error = new HttpError("해당 퀴즈가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("퀴즈 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  // 사용자 존재 여부 확인
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new HttpError("해당 사용자가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("사용자 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  // 퀴즈 결과 제출
  try {
    await submittedResult.save();
  } catch (err) {
    const error = new HttpError("퀴즈 결과 제출에 실패하였습니다.", 500);
    return next(error);
  }

  res.status(201).json({ data: submittedResult.toObject({ getters: true }) });
};

// GET /api/quiz/result/:rid
const getQuizResultById = async (req, res, next) => {
  const resultId = req.params.rid;

  // 퀴즈 결과 조회
  let quizResult;
  try {
    quizResult = await QuizResult.findById(resultId);
    if (!quizResult) {
      const error = new HttpError("퀴즈 결과가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("퀴즈 결과 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }
  res.json({ data: quizResult.toObject({ getters: true }) });
};

exports.getQuizzes = getQuizzes;
exports.getQuizById = getQuizById;
exports.submitResult = submitResult;
exports.getQuizResultById = getQuizResultById;
