const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

router.post(
  "/signup",
  [
    check("nickname").notEmpty().isLength({ min: 2, max: 10 }),
    check("email").notEmpty().normalizeEmail().isEmail(),
    check("password").notEmpty().isLength({ min: 6 }),
  ],
  usersController.registerUser
);

router.post(
  "/login",
  [
    check("email").notEmpty().normalizeEmail().isEmail(),
    check("password").notEmpty().isLength({ min: 6 }),
  ],
  usersController.login
);

router.get("/:id", usersController.getUserById);

router.patch(
  "/:id",
  [
    check("nickname").optional().isLength({ min: 2, max: 10 }),
    check("newPassword").optional().isLength({ min: 6 }),
  ],
  usersController.updateUser
);

router.delete("/:id", usersController.deleteUser);

module.exports = router;
