const Joi = require("joi");
const { addContact } = require("../../models/contacts");

const setContactId = () => {
  const newId = Math.floor(Math.random() * 100000);
  return newId;
};

const createContacts = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    });

    const { error, value } = schema.validate({
      name: name,
      email: email,
      phone: phone,
    });

    if (error) {
      return res.status(400).json({
        message: "missing required name - field",
      });
    }

    value.id = setContactId().toString();

    const result = await addContact(value);

    return res.status(201).json({
      contact: JSON.parse(result),
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  createContacts,
};
