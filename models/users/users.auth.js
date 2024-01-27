const passport = require("passport");
const { strategy } = require("./users.strategy");

const auth = (req, res, next) => {
  passport.authenticate(strategy, (err, user) => {
    if (err || !user) {
      return res
        .status(401)
        .json({ status: "unauthorized", code: 401, message: "Invalid token" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  auth,
};
