const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

// POST /api/users/signup
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "유효하지 않은 입력 데이터를 전달했습니다.",
      422
    );
    return next(error);
  }

  const { nickname, email, password, image } = req.body;

  // 이메일 중복 확인
  try {
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      const error = new HttpError(
        "이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.",
        422
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("사용자 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  // 닉네임 중복 확인
  try {
    const existingNickname = await User.findOne({ nickname: nickname });
    if (existingNickname) {
      const error = new HttpError(
        "이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.",
        422
      );
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

  // 사용자 등록
  try {
    await registeredUser.save();
  } catch (err) {
    const error = new HttpError("회원가입을 실패하였습니다.", 500);
    return next(error);
  }

  res.status(201).json({ data: registeredUser.toObject({ getters: true }) });
};

// POST /api/users/login
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

  // 이메일 일치 여부 확인
  let loginUser;
  try {
    loginUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("사용자 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  // 회원 존재 여부 및 패스워드 일치 여부 확인
  if (!loginUser || loginUser.password !== password) {
    const error = new HttpError(
      "이메일 또는 비밀번호가 올바르지 않습니다.",
      401
    );
    return next(error);
  }

  res.status(200).json({ data: loginUser.toObject({ getters: true }) });
};

// GET /api/users/id
const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  // 사용자 존재 여부 확인
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

  res.json({ data: user.toObject({ getters: true }) });
};

// PATCH /api/users/id
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "유효하지 않은 입력 데이터를 전달했습니다.",
      422
    );
    return next(error);
  }

  const userId = req.params.id;
  const { nickname, currentPassword, newPassword } = req.body;

  // 사용자 존재 여부 확인
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
    // 닉네임 중복 확인
    try {
      const existingNickname = await User.findOne({ nickname: nickname });
      if (existingNickname) {
        const error = new HttpError(
          "이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.",
          422
        );
        return next(error);
      }
    } catch (err) {
      const error = new HttpError("사용자 조회 중 오류가 발생했습니다.", 500);
      return next(error);
    }

    user.nickname = nickname;
  }
  if (newPassword !== undefined) {
    //패스워드 일치 여부 확인
    if (user.password !== currentPassword) {
      const error = new HttpError("현재 비밀번호가 올바르지 않습니다.", 401);
      return next(error);
    }

    user.password = newPassword;
  }

  // 사용자 정보 업데이트
  try {
    await user.save();
  } catch (err) {
    const error = new HttpError("프로필 업데이트를 실패하였습니다.", 500);
    return next(error);
  }

  res.status(200).json({ data: user.toObject({ getters: true }) });
};

// DELETE /api/users/id
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  // 사용자 삭제
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      const error = new HttpError("해당 사용자가 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("회원탈퇴를 실패하였습니다.", 500);
    return next(error);
  }

  res.status(200).json({ message: "회원탈퇴를 성공하였습니다.", userId });
};

exports.signup = signup;
exports.login = login;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
