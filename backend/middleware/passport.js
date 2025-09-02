const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// 랜덤 닉네임 생성
const getRandomNickname = async () => {
  const prefix = "익명";

  while (true) {
    const suffix = Math.random().toString(36).substring(2, 8);
    const nickname = `${prefix}_${suffix}`;
    const existingUser = await User.findOne({ nickname });

    if (!existingUser) {
      return nickname;
    }
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/users/auth/google/callback",
    },

    async function verify(accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });
        let token;
        if (user) {
          // 기존 유저
          token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
        } else {
          // 신규 유저
          const nickname = await getRandomNickname();

          token = jwt.sign(
            {
              googleId: profile.id,
              email: profile.emails?.[0]?.value,
              nickname,
            },
            process.env.JWT_KEY,
            { expiresIn: "10m" }
          );
        }

        return done(null, {
          token,
          userId: user ? user._id : null,
          isNew: !user,
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);
