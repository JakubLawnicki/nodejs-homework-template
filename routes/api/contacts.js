const express = require("express");

const { indexContacts } = require("../../controllers/contacts/indexContacts");
const { showContacts } = require("../../controllers/contacts/showContacts");
const { createContacts } = require("../../controllers/contacts/createContacts");
const { deleteContacts } = require("../../controllers/contacts/deleteContacts");
const { updateContacts } = require("../../controllers/contacts/updateContacts");
const { statusContacts } = require("../../controllers/contacts/statusContacts");

const router = express.Router();

router.use(express.json());

router.get("/", indexContacts);
router.get("/:contactId", showContacts);
router.post("/", createContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContacts);
router.patch("/:contactId/favorite", statusContacts);

module.exports = router;
