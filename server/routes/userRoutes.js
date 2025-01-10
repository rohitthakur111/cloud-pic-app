const express = require("express");
const { protect } = require("../middelware/protect");
const { getUsers } = require("../controller/userController");

const router = express.Router();

router.route("/").get(protect,getUsers)

module.exports = router