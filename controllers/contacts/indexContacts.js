const { listContacts } = require("../../models/contacts/contacts");

const indexContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      contacts,
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  indexContacts,
};
