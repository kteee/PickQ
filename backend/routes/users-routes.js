const express = require("express");
const { check } = require("express-validator");
const passport = require("passport");

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
  "/oauth/signup",
  [
    check("googleId").notEmpty(),
    check("nickname").notEmpty().isLength({ min: 2, max: 10 }),
    check("email").notEmpty().normalizeEmail().isEmail(),
  ],
  usersController.oauthSignup
);

router.post(
  "/login",
  [
    check("email").notEmpty().normalizeEmail().isEmail(),
    check("password").notEmpty().isLength({ min: 6 }),
  ],
  usersController.login
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["openid", "profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token, userId, isNew } = req.user;
    res.redirect(
      `https://www.pickq.im/oauth2/redirect?token=${token}&userId=${userId}&isNew=${isNew}`
    );
  }
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
