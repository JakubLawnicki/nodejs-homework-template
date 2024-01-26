const { Contact } = require("./contacts.schema");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (e) {
    console.error(e);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId });

    if (!contact) {
      return false;
    }
    return contact;
  } catch (e) {
    console.error(e);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactToRemove = await Contact.findOneAndDelete({ _id: contactId });

    if (!contactToRemove) {
      return false;
    }
    return true;
  } catch (e) {
    console.error(e);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone, favorite } = body;
    const contact = new Contact({
      name,
      email,
      phone,
      favorite,
    });

    const newContact = await contact.save();

    return newContact;
  } catch (e) {
    console.error(e);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone, favorite } = body;
    const contactToUpdate = await Contact.findById(contactId);

    if (!contactToUpdate) {
      return false;
    }

    contactToUpdate.id = contactId;
    contactToUpdate.name = name;
    contactToUpdate.email = email;
    contactToUpdate.phone = phone;
    contactToUpdate.favorite = favorite;

    const updated = await contactToUpdate.save();

    return updated;
  } catch (e) {
    console.error(e);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const statusToUpdate = await Contact.findById(contactId);

    if (!statusToUpdate) {
      return false;
    }

    statusToUpdate.favorite = body.favorite;

    const updated = await statusToUpdate.save();

    return updated;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
