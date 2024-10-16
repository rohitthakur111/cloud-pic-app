const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    image : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'images'
    },
    sessionId : {
        type : String,
        require : [true, 'Tranasction id is required']
    },
    paymentStatus : {
        type : String,
        default : 'pending'
    },
    price : {
        type : Number,
        require : [true, 'Price is required']
    },
    currency : {
        type : String,
        require : [true, 'Currency required']
    },
    orderDate : {
        type : Date,
        default :  Date.now,
    }
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order;