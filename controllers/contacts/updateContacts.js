const Joi = require("joi");
const { updateContact } = require("../../models/contacts/contacts");

const updateContacts = async (req, res, next) => {
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
        message: "Missing fields",
      });
    }
    const updated = await updateContact(req.params.contactId, value);

    if (!updated) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    return res.status(200).json({
      updated,
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  updateContacts,
};
