const express = require("express")
const { protect } = require("../middelware/protect")
const { makePayment, confirmPayment, makeOrder, getOrder } = require("../controller/orderController")
const router = express.Router()

router.route('/')
    .post(protect, makePayment)

router.route('/order')
    .get(protect,getOrder)
    .post(protect,makeOrder )

router.route('/session/:sessionId')
    .get(protect, confirmPayment)

module.exports = router 