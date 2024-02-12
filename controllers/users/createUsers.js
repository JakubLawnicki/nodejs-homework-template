const Joi = require("joi");
const { createUser, isEmailFree } = require("../../models/users/users");
const { mailClient } = require("../../models/shared/mail");

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

      mailClient.messages.create(
        "sandbox9a2814cc22a444b99c9d45e8b8f33fd7.mailgun.org",
        {
          from: "no-reply@sandbox9a2814cc22a444b99c9d45e8b8f33fd7.mailgun.org",
          to: [email],
          subject: "Verification email",
          text: `http://localhost:3000/users/verify/${value.verificationToken}`,
        }
      );

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
