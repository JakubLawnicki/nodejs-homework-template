const passport = require("passport");
const passportJWT = require("passport-jwt");
const { Contact } = require("../../models/contacts.schema");

const strategy = new passportJWT.Strategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken,
  },
  (payload, done) => {
    Contact.findOne({ _id: payload.id })
      .then((contact) => {
        if (contact) {
          return done(null, contact);
        }
        return done(new Error("invalid token"));
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
