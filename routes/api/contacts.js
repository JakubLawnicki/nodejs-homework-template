const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

// random id generator

const setContactId = () => {
  const newId = Math.floor(Math.random() * 100000);
  return newId;
};

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    const list = JSON.stringify(data);
    const contacts = JSON.parse(list);

    res.status(200).json({
      status: "success",
      code: 200,
      message: "List of contacts found",
      data: { contacts },
    });
  } catch (e) {
    console.error(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const dataById = await getContactById(id);
    const contactById = JSON.stringify(dataById);
    const contact = JSON.parse(contactById);

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact found",
        data: { contact },
      });
    }

    return res.status(404).json({
      status: "bad request",
      code: 404,
      message: "Nof found",
    });
  } catch (e) {
    console.error(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    console.log(result);
    if (result) {
      return res
        .status(200)
        .json({ status: "success", code: 200, message: "Contact deleted" });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Nof found",
    });
  } catch (e) {
    console.error(e);
  }
});

router.post("/", async (req, res, next) => {
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
        status: "bad request",
        code: 400,
        message: "missing required name - field",
      });
    }

    value.id = setContactId().toString();

    const result = await addContact(value);

    return res.status(201).json({
      status: "created",
      code: 201,
      message: "Contact added",
      data: JSON.parse(result),
    });
  } catch (e) {
    console.error(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
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
        status: "bad request",
        code: 400,
        message: "missing fields",
      });
    }
    const result = await updateContact(req.params.contactId, value);

    if (!result) {
      return res.status(404).json({
        status: "bad request",
        code: 404,
        message: "Not found",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact updated",
      data: result,
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
