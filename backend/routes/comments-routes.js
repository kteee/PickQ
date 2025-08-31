const express = require("express");
const { check } = require("express-validator");

const commentsController = require("../controllers/comments-controller");

const router = express.Router();

router.get("/:id", commentsController.getCommentsByTestId);

router.post(
  "/:id",
  [check("userId").notEmpty(), check("content").notEmpty()],
  commentsController.createComment
);

router.delete("/:id", commentsController.deleteComment);

module.exports = router;
