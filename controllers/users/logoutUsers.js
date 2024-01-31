const { User } = require("../../models/users/users.schema");

const logoutUsers = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.token = null;
    user.save();

    return res.status(204).json({ status: "No content" });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  logoutUsers,
};
