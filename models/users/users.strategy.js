const passport = require("passport");
const passportJWT = require("passport-jwt");
const { User } = require("./users.schema");

const strategy = new passportJWT.Strategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (payload, done) => {
    User.findOne({ _id: payload.id })
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(new Error("Invalid token"));
      })
      .catch((e) => {
        return done(e);
      });
  }
);

passport.use(strategy);

module.exports = {
  strategy,
};
