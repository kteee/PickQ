const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

// POST /api/users/signup
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("유효하지 않은 입력 데이터입니다.", 422);
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
    const error = new HttpError(
      "사용자 정보를 불러오는 중 문제가 발생했습니다.",
      500
    );
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
    const error = new HttpError(
      "사용자 정보를 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  // 비밀번호 암호화
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("회원가입 처리 중 문제가 발생했습니다.", 500);
    return next(error);
  }

  // 사용자 저장
  const signupUser = new User({
    nickname,
    email,
    password: hashedPassword,
    image,
  });

  try {
    await signupUser.save();
  } catch (err) {
    const error = new HttpError("회원가입에 실패하였습니다.", 500);
    return next(error);
  }

  res.status(201).json({
    message: "회원가입이 완료되었습니다.",
    data: {
      userId: signupUser.id,
      email: signupUser.email,
    },
  });
};

// POST /api/oauth/signup
const oauthSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("유효하지 않은 입력 데이터입니다.", 422);
    return next(error);
  }

  const { googleId, email, nickname } = req.body;

  // 사용자 저장
  const signupUser = new User({
    googleId,
    email,
    nickname,
  });

  try {
    await signupUser.save();
  } catch (err) {
    const error = new HttpError("회원가입에 실패하였습니다.", 500);
    return next(error);
  }

  // 토큰 생성
  let token;
  try {
    token = jwt.sign(
      { userId: signupUser.id, email: signupUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("로그인 처리 중 문제가 발생했습니다.", 500);
    return next(error);
  }

  res.status(201).json({
    message: "회원가입이 완료되었습니다.",
    data: {
      userId: signupUser.id,
      email: signupUser.email,
      token,
    },
  });
};

// POST /api/users/login
const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("유효하지 않은 입력 데이터입니다.", 422);
    return next(error);
  }
  const { email, password } = req.body;

  // 이메일 일치 여부 확인
  let loginUser;
  try {
    loginUser = await User.findOne({ email: email });
    if (!loginUser) {
      const error = new HttpError(
        "이메일 또는 비밀번호가 올바르지 않습니다.",
        401
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "사용자 정보를 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  // 비밀번호 일치 여부 확인
  let isValidPssword = false;
  try {
    isValidPssword = await bcrypt.compare(password, loginUser.password);
    if (!isValidPssword) {
      const error = new HttpError(
        "이메일 또는 비밀번호가 올바르지 않습니다.",
        401
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("로그인 처리 중 문제가 발생했습니다.", 500);
    return next(error);
  }

  // 토큰 생성
  let token;
  try {
    token = jwt.sign(
      { userId: loginUser.id, email: loginUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("로그인 처리 중 문제가 발생했습니다.", 500);
    return next(error);
  }

  res.status(200).json({
    message: "로그인을 성공하였습니다.",
    data: {
      userId: loginUser.id,
      email: loginUser.email,
      token: token,
    },
  });
};

// GET /api/users/profile
const getUserById = async (req, res, next) => {
  const userId = req.userData.userId;

  // 사용자 존재 여부 확인
  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      const error = new HttpError("사용자를 찾을 수 없습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "사용자 정보를 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  res.json({
    message: "사용자 정보를 불러왔습니다.",
    data: user.toObject({ getters: true }),
  });
};

// PATCH /api/users/profile
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("유효하지 않은 입력 데이터입니다.", 422);
    return next(error);
  }

  const userId = req.userData.userId;
  const { nickname, currentPassword, newPassword } = req.body;

  // 사용자 존재 여부 확인
  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      const error = new HttpError("사용자를 찾을 수 없습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "사용자 정보를 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  // 권한 검증
  if (userId !== req.userData.userId) {
    const error = new HttpError("해당 정보를 수정할 권한이 없습니다.", 403);
    return next(error);
  }

  // 닉네임 중복 확인
  if (nickname !== undefined) {
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
      const error = new HttpError(
        "사용자 정보를 불러오는 중 문제가 발생했습니다.",
        500
      );
      return next(error);
    }

    user.nickname = nickname;
  }

  // 현재 비밀번호 일치 여부 확인
  if (newPassword !== undefined) {
    let isValidPssword = false;
    try {
      isValidPssword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPssword) {
        const error = new HttpError("현재 비밀번호가 올바르지 않습니다.", 401);
        return next(error);
      }
    } catch (err) {
      const error = new HttpError(
        "비밀번호 변경 처리 중 문제가 발생했습니다.",
        500
      );
      return next(error);
    }

    // 비밀번호 암호화
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(newPassword, 12);
    } catch (err) {
      const error = new HttpError(
        "비밀번호 변경 처리 중 문제가 발생했습니다.",
        500
      );
      return next(error);
    }
    user.password = hashedPassword;
  }

  // 사용자 정보 업데이트
  try {
    await user.save();
  } catch (err) {
    const error = new HttpError("프로필 업데이트에 실패하였습니다.", 500);
    return next(error);
  }

  res.status(200).json({
    message: "프로필이 성공적으로 업데이트되었습니다.",
    data: user.toObject({ getters: true }),
  });
};

// DELETE /api/users/profile
const deleteUser = async (req, res, next) => {
  const userId = req.userData.userId;

  // 권한 검증
  if (userId !== req.userData.userId) {
    const error = new HttpError("해당 정보를 삭제할 권한이 없습니다.", 403);
    return next(error);
  }

  // 사용자 삭제
  let user;
  try {
    user = await User.findByIdAndDelete(userId);
    if (!user) {
      const error = new HttpError("사용자를 찾을 수 없습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("회원탈퇴에 실패하였습니다.", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ message: "회원탈퇴가 완료되었습니다.", data: { userId: user.id } });
};

exports.signup = signup;
exports.oauthSignup = oauthSignup;
exports.login = login;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
