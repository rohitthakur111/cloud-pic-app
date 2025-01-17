const express = require("express");
const { protect } = require("../middelware/protect");
const { getUsers, deleteUser } = require("../controller/userController");

const router = express.Router();

router.route("/").get(protect,getUsers)
router.route("/:id")
    .delete(protect, deleteUser)

module.exports = router