const mongoose = require("mongoose")

const whishSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    image : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'images'
    }
})

const Whish = mongoose.model('whishlist', whishSchema)

module.exports = Whish;