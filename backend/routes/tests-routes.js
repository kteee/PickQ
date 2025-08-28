const express = require("express");
const { check } = require("express-validator");

const testsController = require("../controllers/tests-controller");

const router = express.Router();

router.get("/", testsController.getTests);

router.get("/:id", testsController.getTestById);

router.post(
  "/result",
  [
    check("testId").notEmpty(),
    check("userId").notEmpty(),
    check("score").notEmpty(),
  ],
  testsController.submitResult
);

router.get("/result/:id", testsController.getResultById);

module.exports = router;
