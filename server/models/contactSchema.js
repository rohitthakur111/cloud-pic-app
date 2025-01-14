const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required']
    },
    email : {
        type : String,
        required : [true, 'Email is required']
    },
    message : {
        type : String,
        required : [true, 'Message is required']
    },
    createdAt : {
        type :Date,
        default : Date.now
    }
})

const Contact = mongoose.model('contact', contactSchema)
module.exports = Contact;