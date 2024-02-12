const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/users/users.schema");
const Jimp = require("jimp");
const multer = require("multer");

const { createUsers } = require("../../controllers/users/createUsers");
const { loginUsers } = require("../../controllers/users/loginUsers");
const { logoutUsers } = require("../../controllers/users/logoutUsers");
const { auth } = require("../../models/users/users.auth");
const { showUsers } = require("../../controllers/users/showUsers");
const {
  verifyUsers,
  resendVerificationMail,
} = require("../../controllers/users/verifyUsers");

const uploadDir = path.join(process.cwd(), "tmp");
const storeAvatar = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

const router = express.Router();

router.use(express.json());

router.post("/signup", createUsers);
router.post("/login", loginUsers);
router.get("/logout", auth, logoutUsers);
router.get("/current", auth, showUsers);
router.post("/verify", resendVerificationMail);
router.get("/verify/:verificationToken", verifyUsers);
router.patch("/avatars", auth, upload.single("avatar"), async (req, res) => {
  try {
    const { _id } = req.user;
    const avatarPath = path.join(uploadDir, req.file.filename);
    const newAvatarPath = path.join(storeAvatar, `${_id}.jpg`);

    await Jimp.read(avatarPath)
      .then((avatar) => {
        return avatar.resize(250, 250);
      })
      .catch((err) => console.log(err));

    fs.rename(avatarPath, newAvatarPath)
      .then(() => console.log("File transfer success"))
      .catch((err) => console.log(err));

    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.avatarUrl = `/avatars/${_id}.jpg`;
    user.save();

    return res.status(200).json({ avatarUrl: `${user.avatarUrl}` });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
});

module.exports = router;
