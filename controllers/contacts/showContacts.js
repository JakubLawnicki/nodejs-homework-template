const { getContactById } = require("../../models/contacts");

const showContacts = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (contact) {
      return res.status(200).json({
        contact,
      });
    }

    return res.status(404).json({
      status: "bad request",
      message: "Nof found",
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

module.exports = {
  showContacts,
};
