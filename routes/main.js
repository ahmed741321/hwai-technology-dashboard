const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// GET
router.get("/", mainController.home_page);
router.post("/login", mainController.login);
router.get("/verify", mainController.verify);
router.get("/verify-token", mainController.verify_token);

module.exports = router;
