const Joi = require("joi");
const { addContact } = require("../../models/contacts/contacts");

const createContacts = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;

    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean().required(),
    });

    const { error, value } = schema.validate({
      name: name,
      email: email,
      phone: phone,
      favorite: favorite,
    });

    if (error) {
      return res.status(400).json({
        message: "missing required name - field",
      });
    } else {
      const contact = await addContact(value);

      return res.status(201).json({
        contact,
      });
    }
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  createContacts,
};
