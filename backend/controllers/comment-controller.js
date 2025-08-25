const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Comment = require("../models/comment");
const User = require("../models/user");
const Quiz = require("../models/quiz");

// GET /api/comment/:qid -- 완료!!
const getCommentsByQuizId = async (req, res, next) => {
  const quizId = req.params.qid;

  // 댓글 목록 조회
  let comments;
  try {
    comments = await Comment.find({ quizId: quizId }).populate(
      "userId",
      "nickname"
    );
  } catch (err) {
    const error = new HttpError("댓글 조회 중 오류가 발생했습니다.", 500);
    return next(error);
  }

  res.json({
    comments: comments.map((comment) => comment.toObject({ getters: true })),
  });
};

// POST /api/comment/:qid -- 완료!!
const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "유효하지 않은 입력 데이터를 전달했습니다.",
      422
    );
    return next(error);
  }

  const quizId = req.params.qid;
  const { userId, content } = req.body;

  const createdComment = new Comment({
    quizId,
    userId,
    content,
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

  // 댓글 등록
  try {
    await createdComment.save();
  } catch (err) {
    const error = new HttpError("댓글 등록을 실패하였습니다.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ createdComment: createdComment.toObject({ getters: true }) });
};

// DELETE /api/comment/:cid -- 완료!!
const deleteComment = async (req, res, next) => {
  const commentId = req.params.cid;

  // 댓글 삭제
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      const error = new HttpError("해당 댓글이 존재하지 않습니다.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("댓글 삭제를 실패하였습니다.", 500);
    return next(error);
  }

  res.status(200).json({ message: "댓글 삭제를 성공하였습니다.", commentId });
};

exports.getCommentsByQuizId = getCommentsByQuizId;
exports.createComment = createComment;
exports.deleteComment = deleteComment;
