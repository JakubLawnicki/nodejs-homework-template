const express = require("express");

const { indexContacts } = require("../../controllers/contacts/indexContacts");
const { showContacts } = require("../../controllers/contacts/showContacts");
const { createContacts } = require("../../controllers/contacts/createContacts");
const { deleteContacts } = require("../../controllers/contacts/deleteContacts");

const router = express.Router();

router.use(express.json());

router.get("/", indexContacts);
router.get("/:contactId", showContacts);
router.post("/", createContacts);
router.delete("/:contactId", deleteContacts);

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { name, email, phone } = req.body;

//     const schema = Joi.object({
//       name: Joi.string().required(),
//       email: Joi.string().email().required(),
//       phone: Joi.string().required(),
//     });

//     const { error, value } = schema.validate({
//       name: name,
//       email: email,
//       phone: phone,
//     });

//     if (error) {
//       return res.status(400).json({
//         status: "bad request",
//         code: 400,
//         message: "missing fields",
//       });
//     }
//     const result = await updateContact(req.params.contactId, value);

//     if (!result) {
//       return res.status(404).json({
//         status: "bad request",
//         code: 404,
//         message: "Not found",
//       });
//     }

//     return res.status(200).json({
//       status: "success",
//       code: 200,
//       message: "Contact updated",
//       data: result,
//     });
//   } catch (e) {
//     console.error(e);
//   }
// });

module.exports = router;
