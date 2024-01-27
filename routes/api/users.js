const express = require("express");

const { createUsers } = require("../../controllers/users/createUsers");
const { loginUsers } = require("../../controllers/users/loginUsers");

const router = express.Router();

router.use(express.json());

router.post("/signup", createUsers);
router.post("/login", loginUsers);
router.get("/logout");
router.get("/current");

module.exports = router;
