const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControler");

// GET
router.get("/", userController.home_page);

router.get("/add", userController.user_add);

router.get("/view/:id", userController.view_user);

router.get("/edit/:id", userController.user_show_for_edit);

//POST
router.post("/add", userController.add_new_user);

router.get("/search", userController.search);

// DELETE
router.delete("/:userId", userController.delete_user);

// PUT
router.put("/update/:userId", userController.update_user);

module.exports = router;
