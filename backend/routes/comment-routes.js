const express = require("express");
const { check } = require("express-validator");

const commentController = require("../controllers/comment-controller");

const router = express.Router();

router.get("/:qid", commentController.getCommentsByQuizId);

router.post(
  "/:qid",
  [check("userId").notEmpty(), check("content").notEmpty()],
  commentController.createComment
);

router.delete("/:cid", commentController.deleteComment);

module.exports = router;
