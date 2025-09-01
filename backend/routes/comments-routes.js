const express = require("express");
const { check } = require("express-validator");

const commentsController = require("../controllers/comments-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:id", commentsController.getCommentsByTestId);

router.use(checkAuth);

router.post(
  "/:id",
  [check("content").notEmpty()],
  commentsController.createComment
);

router.delete("/:id", commentsController.deleteComment);

module.exports = router;
