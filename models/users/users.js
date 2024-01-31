const { User } = require("./users.schema");

const createUser = async (body) => {
  try {
    const { email, password } = body;

    const user = new User({
      email,
      password,
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
