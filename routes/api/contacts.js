const express = require("express");

const { indexContacts } = require("../../controllers/contacts/indexContacts");
const { showContacts } = require("../../controllers/contacts/showContacts");
const { createContacts } = require("../../controllers/contacts/createContacts");
const { deleteContacts } = require("../../controllers/contacts/deleteContacts");
const { updateContacts } = require("../../controllers/contacts/updateContacts");
const { statusContacts } = require("../../controllers/contacts/statusContacts");
const { auth } = require("../../models/users/users.auth");

const router = express.Router();

router.use(express.json());

router.get("/", auth, indexContacts);
router.get("/:contactId", auth, showContacts);
router.post("/", auth, createContacts);
router.delete("/:contactId", auth, deleteContacts);
router.put("/:contactId", auth, updateContacts);
router.patch("/:contactId/favorite", auth, statusContacts);

module.exports = router;
