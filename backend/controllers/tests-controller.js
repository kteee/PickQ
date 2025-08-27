const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Test = require("../models/test");
const User = require("../models/user");
const Result = require("../models/result");

// GET /api/tests
const getTests = async (req, res, next) => {
  // 전체 테스트 목록 조회
  let tests;
  try {
    tests = await Test.find(
      {},
      "-answerType -quizQuestions -psytestQuestions -psytestResults"
    );
  } catch (err) {
    const error = new HttpError("테스트 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  res.json({
    data: tests.map((test) => test.toObject({ getters: true })),
  });
};

// GET /api/tests/:id
const getTestById = async (req, res, next) => {
  // 테스트 상세 조회
  const testId = req.params.id;
  let test;
  try {
    test = await Test.findOne({ shortId: testId });
    if (!test) {
      const error = new HttpError("해당 테스트가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("테스트 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  res.json({ data: test.toObject({ getters: true }) });
};

// POST /api/tests/result
const submitResult = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "유효하지 않은 입력 데이터를 전달했습니다.",
      422
    );
    return next(error);
  }

  const { testId, userId, score, total } = req.body;
  const submittedResult = new Result({
    testId,
    userId,
    score,
    total,
  });

  // 테스트 존재 여부 확인
  try {
    const test = await Test.findById(testId);
    if (!test) {
      const error = new HttpError("해당 테스트가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("테스트 조회 중 오류가 발생했습니다.", 500);
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

  // 테스트 결과 제출
  try {
    await submittedResult.save();
  } catch (err) {
    const error = new HttpError("테스트 결과 제출에 실패하였습니다.", 500);
    return next(error);
  }

  res.status(201).json({ data: submittedResult.toObject({ getters: true }) });
};

// GET /api/tests/result/:id
const getResultById = async (req, res, next) => {
  const resultId = req.params.id;

  // 테스트 결과 조회
  let result;
  try {
    result = await Result.findById(resultId).populate(
      "testId",
      "title shortId"
    );
    if (!result) {
      const error = new HttpError("테스트 결과가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "테스트 결과 조회 중 오류가 발생했습니다.",
      500
    );
    return next(error);
  }
  res.json({ data: result.toObject({ getters: true }) });
};

exports.getTests = getTests;
exports.getTestById = getTestById;
exports.submitResult = submitResult;
exports.getResultById = getResultById;
