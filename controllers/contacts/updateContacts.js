const { updateContact } = require("../../models/contacts");
const Joi = require("joi");

const updateContacts = async (req, res, next) => {
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
        message: "Missing fields",
      });
    }
    const result = await updateContact(req.params.contactId, value);

    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    return res.status(200).json({
      contact: result,
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  updateContacts,
};
