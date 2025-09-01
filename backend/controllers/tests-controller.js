const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
    const error = new HttpError(
      "테스트 목록을 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  res.json({
    message: "테스트 목록을 성공적으로 불러왔습니다.",
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
      const error = new HttpError("해당 테스트를 찾을 수 없습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "테스트 정보를 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  res.json({
    message: "테스트 정보를 성공적으로 불러왔습니다.",
    data: test.toObject({ getters: true }),
  });
};

// POST /api/tests/submit
const submitResult = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("유효하지 않은 입력 데이터입니다.", 422);
    return next(error);
  }

  const { testId, score, total } = req.body;

  let userId = null;
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      userId = decodedToken.userId;
    } catch (err) {
      userId = null;
    }
  }

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
      const error = new HttpError("해당 테스트를 찾을 수 없습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "테스트 정보를 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  // 사용자 존재 여부 확인
  if (userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        const error = new HttpError("해당 사용자를 찾을 수 없습니다.", 404);
        return next(error);
      }
    } catch (err) {
      const error = new HttpError(
        "사용자 정보를 불러오는 중 문제가 발생했습니다.",
        500
      );
      return next(error);
    }
  }

  // 테스트 결과 저장
  try {
    await submittedResult.save();
  } catch (err) {
    const error = new HttpError(
      "테스트 결과 저장 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    message: "테스트 결과가 성공적으로 제출되었습니다.",
    data: submittedResult.toObject({ getters: true }),
  });
};

// GET /api/tests/result/:id
const getResultById = async (req, res, next) => {
  const resultId = req.params.id;

  // 테스트 결과 조회
  let result;
  try {
    result = await Result.findById(resultId).populate(
      "testId",
      "title shortId psytestResults"
    );
    if (!result) {
      const error = new HttpError("해당 테스트 결과를 찾을 수 없습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "테스트 결과를 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }
  res.json({
    message: "테스트 결과를 성공적으로 불러왔습니다.",
    data: result.toObject({ getters: true }),
  });
};

exports.getTests = getTests;
exports.getTestById = getTestById;
exports.submitResult = submitResult;
exports.getResultById = getResultById;
