const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/users/users.schema");

const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({
      email: email,
      password: password,
    });

    if (error) {
      return res
        .status(400)
        .json({ status: "bad request", message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        status: "bad request",
        code: 400,
        message: "Email or password is wrong",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    user.token = token;
    user.save();

    return res.status(200).json({
      token: token,
      user: { email, subscription: "starter" },
      message: "Login success",
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  loginUsers,
};
