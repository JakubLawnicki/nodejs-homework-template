const { User } = require("./users.schema");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const createUser = async (body) => {
  try {
    const { email, password } = body;

    const user = new User({
      email,
      password,
      avatarUrl: gravatar.url(email),
      verificationToken: uuidv4(),
    });

    user.setPassword(password);

    const newUser = await user.save();

    return newUser;
  } catch (e) {
    console.error(e);
  }
};

const isEmailFree = async (email) => {
  const user = await User.findOne({
    email: email,
  });

  if (user) {
    return false;
  }

  return true;
};

module.exports = {
  createUser,
  isEmailFree,
};
