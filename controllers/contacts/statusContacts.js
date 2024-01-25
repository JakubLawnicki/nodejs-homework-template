const { updateStatusContact } = require("../../models/contacts");

const statusContacts = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    if (!body) {
      return res.status(400).json({ message: "Missing field favorite" });
    }
    const withUpdatedStatus = await updateStatusContact(contactId, body);

    if (!withUpdatedStatus) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ withUpdatedStatus });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  statusContacts,
};
