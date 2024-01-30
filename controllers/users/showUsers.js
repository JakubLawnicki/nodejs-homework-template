const { User } = require("../../models/users/users.schema");

const showUsers = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { email, subscription } = user;
    return res.status(200).json({ email, subscription });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  showUsers,
};
