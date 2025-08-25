const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.post(
  "/register",
  [
    check("nickname").notEmpty().isLength({ min: 2, max: 10 }),
    check("email").notEmpty().normalizeEmail().isEmail(),
    check("password").notEmpty().isLength({ min: 6 }),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    check("email").notEmpty().normalizeEmail().isEmail(),
    check("password").notEmpty().isLength({ min: 6 }),
  ],
  userController.login
);

router.get("/:uid", userController.getUserById);

router.patch(
  "/:uid",
  [
    check("nickname").optional().isLength({ min: 2, max: 10 }),
    check("password").optional().isLength({ min: 6 }),
  ],
  userController.updateUser
);

router.delete("/:uid", userController.deleteUser);

module.exports = router;
