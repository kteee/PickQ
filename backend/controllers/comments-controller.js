const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Comment = require("../models/comment");
const User = require("../models/user");
const Test = require("../models/test");

// GET /api/comments/:id
const getCommentsByTestId = async (req, res, next) => {
  const testId = req.params.id;

  // 퀴즈 존재 여부 확인
  let test;
  try {
    test = await Test.findOne({ shortId: testId });

    if (!test) {
      const error = new HttpError("해당 퀴즈를 찾을 수 없습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "퀴즈 정보를 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  // 댓글 목록 조회
  let comments;
  try {
    comments = await Comment.find({ testId: test._id }).populate(
      "userId",
      "nickname"
    );
  } catch (err) {
    const error = new HttpError(
      "댓글 목록을 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  res.json({
    data: comments.map((comment) => comment.toObject({ getters: true })),
  });
};

// POST /api/comments/:id
const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("유효하지 않은 입력 데이터입니다.", 422);
    return next(error);
  }

  const testId = req.params.id;
  const userId = req.userData.userId;
  const { content } = req.body;

  // 퀴즈 존재 여부 확인
  let test;
  try {
    test = await Test.findOne({ shortId: testId });

    if (!test) {
      const error = new HttpError("해당 퀴즈를 찾을 수 없습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "퀴즈 정보를 불러오는 중 문제가 발생했습니다.",
      500
    );
    return next(error);
  }

  // 사용자 존재 여부 확인
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

  // 댓글 등록
  const createdComment = new Comment({
    testId: test._id,
    userId,
    content,
  });

  try {
    await createdComment.save();
  } catch (err) {
    const error = new HttpError("댓글 등록에 실패하였습니다.", 500);
    return next(error);
  }

  res.status(201).json({ data: createdComment.toObject({ getters: true }) });
};

// DELETE /api/comments/:id
const deleteComment = async (req, res, next) => {
  const commentId = req.params.id;

  // 댓글 존재 여부 확인
  let comment;
  try {
    comment = await Comment.findById(commentId).populate("userId");
    if (!comment) {
      const error = new HttpError("해당 댓글을 찾을 수 없습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("댓글 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  // 권한 검증
  if (comment.userId.id !== req.userData.userId) {
    const error = new HttpError("해당 정보를 삭제할 권한이 없습니다.", 403);
    return next(error);
  }

  // 댓글 삭제
  try {
    await comment.deleteOne();
  } catch (err) {
    const error = new HttpError("댓글 삭제에 실패하였습니다.", 403);
    return next(error);
  }

  res.status(200).json({ message: "댓글이 삭제되었습니다.", commentId });
};

exports.getCommentsByTestId = getCommentsByTestId;
exports.createComment = createComment;
exports.deleteComment = deleteComment;
