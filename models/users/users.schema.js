const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const users = new Schema({
  password: {
    type: String,
    required: ["true", "Password is required"],
  },
  email: {
    type: String,
    required: ["true", "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarUrl: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

users.methods.setPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(password, salt);
};

users.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("user", users);

module.exports = {
  User,
};
