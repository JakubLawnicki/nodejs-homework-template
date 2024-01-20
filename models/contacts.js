const fs = require("fs/promises");

const listContacts = async () => {
  try {
    const data = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (e) {
    console.error(e);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
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
    const data = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(data);
    const contactToRemove = contacts.find(
      (contact) => contact.id === contactId
    );
    if (!contactToRemove) {
      return false;
    }

    const withoutRemoved = contacts.filter(
      (contact) => contact.id !== contactId
    );

    fs.writeFile("./models/contacts.json", JSON.stringify(withoutRemoved));

    return true;
  } catch (e) {
    console.error(e);
  }
};

const addContact = async (body) => {
  try {
    const res = JSON.stringify(body);
    const data = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(data);
    const withAddedContact = [...contacts, body];

    fs.writeFile("./models/contacts.json", JSON.stringify(withAddedContact));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const data = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(data);
    const contactToUpdate = contacts.find(
      (contact) => contact.id === contactId
    );

    if (!contactToUpdate) {
      return false;
    }

    contactToUpdate.id = contactId;
    contactToUpdate.name = name;
    contactToUpdate.email = email;
    contactToUpdate.phone = phone;

    fs.writeFile("./models/contacts.json", JSON.stringify(contacts));

    return contactToUpdate;
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
};
