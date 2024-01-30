const express = require("express");

const { createUsers } = require("../../controllers/users/createUsers");
const { loginUsers } = require("../../controllers/users/loginUsers");
const { logoutUsers } = require("../../controllers/users/logoutUsers");
const { auth } = require("../../models/users/users.auth");

const router = express.Router();

router.use(express.json());

router.post("/signup", createUsers);
router.post("/login", loginUsers);
router.get("/logout", auth, logoutUsers);
router.get("/current");

module.exports = router;
