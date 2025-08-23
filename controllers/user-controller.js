const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

// POST /api/user/register -- 완료!!
const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "유효하지 않은 입력 데이터를 전달했습니다.",
      422
    );
    return next(error);
  }

  const { nickname, email, password, image } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new HttpError("이미 사용하고 있는 이메일입니다.", 422);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("사용자 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  const registeredUser = new User({
    nickname,
    email,
    password,
    image,
  });

  try {
    await registeredUser.save();
  } catch (err) {
    const error = new HttpError("회원가입을 실패하였습니다.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ registeredUser: registeredUser.toObject({ getters: true }) });
};

// POST /api/user/login
const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "유효하지 않은 입력 데이터를 전달했습니다.",
      422
    );
    return next(error);
  }
  const { email, password } = req.body;

  let loginUser;
  try {
    loginUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("사용자 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  if (!loginUser || loginUser.password !== password) {
    const error = new HttpError(
      "이메일 또는 비밀번호가 일치하지 않습니다.",
      401
    );
    return next(error);
  }

  res.status(200).json({ message: "로그인에 성공하였습니다." });
};

// GET /api/user/:uid -- 완료!!
const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      const error = new HttpError("해당 사용자가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("사용자 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

// PATCH /api/user/:uid -- 완료!!
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "유효하지 않은 입력 데이터를 전달했습니다.",
      422
    );
    return next(error);
  }

  const userId = req.params.uid;
  const { nickname, password } = req.body;

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      const error = new HttpError("해당 사용자가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("사용자 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  if (nickname !== undefined) {
    user.nickname = nickname;
  }
  if (password !== undefined) {
    user.password = password;
  }

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError("프로필 업데이트를 실패하였습니다.", 500);
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

// DELETE /api/user/:uid -- 완료!!
const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      const error = new HttpError("해당 사용자가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("사용자 삭제를 실패하였습니다.", 500);
    return next(error);
  }

  res.status(200).json({ message: "사용자 삭제를 성공하였습니다.", userId });
};

exports.registerUser = registerUser;
exports.login = login;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
