const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mailClient = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

module.exports = {
  mailClient,
};
