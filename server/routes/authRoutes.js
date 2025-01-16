const express = require("express");
const { register, login, getUser, updateMe, googleLogin, updatePassword,forgotPassword, resetPassword } = require("../controller/authController");
const uplaod = require('./../middelware/multer-upload')
const { protect } = require("../middelware/protect");

const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/google').post(googleLogin)

// reset password
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").post(resetPassword)


router.route('/me')
    .get(protect, getUser)
    .patch(protect, uplaod.single('profilePicture'), updateMe)
   
router.route("/change-password")
    .patch(protect, updatePassword)

module.exports = router;        