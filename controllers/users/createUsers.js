const Joi = require("joi");
const { createUser, isEmailFree } = require("../../models/users/users");

const createUsers = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate({
      email: email,
      password: password,
    });

    if (error) {
      return res
        .status(400)
        .json({ status: "bad request", message: "All fields are required" });
    }

    const freeEmail = await isEmailFree(email);

    if (freeEmail) {
      const user = await createUser(value);

      return res.status(201).json({ status: "created", user: user });
    } else {
      return res
        .status(409)
        .json({ status: "conflict", message: "Email in use" });
    }
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  createUsers,
};
