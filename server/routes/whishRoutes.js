const express = require("express")
const { protect } = require("../middelware/protect")
const { saveWhishList, getWhishList } = require("../controller/whishController")
const router = express.Router()

router.route('/')
    .get(protect, getWhishList)
    .post(protect, saveWhishList)

module.exports = router