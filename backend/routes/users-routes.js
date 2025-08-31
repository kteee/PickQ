const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post(
  "/signup",
  [
    check("nickname").notEmpty().isLength({ min: 2, max: 10 }),
    check("email").notEmpty().normalizeEmail().isEmail(),
    check("password").notEmpty().isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post(
  "/login",
  [
    check("email").notEmpty().normalizeEmail().isEmail(),
    check("password").notEmpty().isLength({ min: 6 }),
  ],
  usersController.login
);

router.use(checkAuth);

router.get("/profile", usersController.getUserById);

router.patch(
  "/profile",
  [
    check("nickname").optional().isLength({ min: 2, max: 10 }),
    check("newPassword").optional().isLength({ min: 6 }),
  ],
  usersController.updateUser
);

router.delete("/profile", usersController.deleteUser);

module.exports = router;
