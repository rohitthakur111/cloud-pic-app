const express = require("express");
const { register, login, getUser, updateMe } = require("../controller/authController");
const uplaod = require('./../middelware/multer-upload')
const { protect } = require("../middelware/protect");

const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me')
    .get(protect, getUser)
    .patch(protect, uplaod.single('profilePicture'), updateMe)

module.exports = router;        