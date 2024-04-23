const express = require("express");
const router = express.Router();
const User = require("../models/users");
var moment = require("moment");
const userController = require("../controllers/userControler");

// GET
router.get("/", userController.home_page);

router.get("/user/add", userController.user_add);

router.get("/user/view/:id", userController.view_user);

router.get("/user/edit/:id", userController.user_show_for_edit);

//POST
router.post("/user", userController.add_new_user);

router.get("/search", userController.search);

// DELETE
router.delete("/user/:userId", userController.delete_user);

// PUT
router.put("/user/update/:userId", userController.update_user);

module.exports = router;
