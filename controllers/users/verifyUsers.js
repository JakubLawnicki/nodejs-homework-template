const { User } = require("./users.schema");
const { mailClient } = require("../../models/shared/mail");
const Joi = require("joi");

const verifyUsers = async (req, res) => {
  const { verificationToken, email } = req.user;

  if (verificationToken === req.params.verificationToken) {
    const user = await User.findOne({ email });
    user.verify = true;

    user.save();

    return res.status(200).json({ message: "Verification successful" });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

const resendVerificationMail = async (req, res) => {
  const { email } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate({
    email: email,
  });

  if (error) {
    return res.status(400).json({ message: "Missing required field email" });
  }

  if (req.user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  mailClient.messages.create(
    "sandbox9a2814cc22a444b99c9d45e8b8f33fd7.mailgun.org",
    {
      from: "no-reply@sandbox9a2814cc22a444b99c9d45e8b8f33fd7.mailgun.org",
      to: [email],
      subject: "Verification email",
      text: `http://localhost:3000/users/verify/${req.user.verificationToken}`,
    }
  );

  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  verifyUsers,
  resendVerificationMail,
};
