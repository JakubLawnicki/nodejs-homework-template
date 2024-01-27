const { removeContact } = require("../../models/contacts/contacts");

const deleteContacts = async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);

    if (result) {
      return res.status(200).json({ message: "Contact deleted" });
    }

    return res.status(404).json({
      message: "Nof found",
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  deleteContacts,
};
