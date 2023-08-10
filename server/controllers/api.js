const express = require("express");
const router = express.Router();

router.post("/notes", require("./notes/getNotes.controller"));
router.post("/update", require("./notes/updateNotes.controller"));
router.post("/create", require("./notes/createNote.controller"));
router.post("/notify", require("./notes/notify.controller"));
router.post("/register", require("./auth/register.controller"));
router.post("/login", require("./auth/login.controller"));
router.post("/authenticate", require("./auth/authenticate.controller"));
router.post("/send-otp", require("./auth/sendOTP.controller"));
router.post("/reset-pass", require("./auth/resetPass.controller"));
router.post("/contact", require("./contact.controller"));

module.exports = router;
