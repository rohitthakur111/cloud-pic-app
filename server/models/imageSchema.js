const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required : [true, 'User is required']
    },
    title : {
        type : String,
        required : [true, 'Title is required'],
    },

    description : {
        type : String,
        required : [true, 'Description is required'],
    },
    public_id : {
        type : String,
        required : [true, 'Public Id is required'],
    },
    imageUrl : {
        type : String,
        required : [true, 'Image is required'],
    },
    imageType : {
        type : String,
        required : true,
    },
    imageName : String,
    price : Number,
    currency : String, 
    upload_on: {
        type :Date,
        default : Date.now
    }
})

const Image = mongoose.model('images', imageSchema)

module.exports = Image;