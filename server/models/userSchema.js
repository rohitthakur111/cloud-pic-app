const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : [true , 'User name is required']
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique: true,
        trim : true,
        lowercase: true,
        validate: {
            validator: function(v) {
              // Regex pattern for basic  email validation
              return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },
    password : {
        type : String,
        select : false,
        required : [true , 'password is required']
    },
    phone : String,
    profilePicture :  String,
    public_id : String,
    bio : String,
    dateOfBirth : Date,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], 
    },
    location: {
        city: {
          type: String,
        },
        country: {
          type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
    isActive: {
        type: Boolean,
        default: true,
        select : false,
    },
    role: {
        type: String,
        enum: ['user', 'editor', 'admin'], 
        default: 'user', 
    },
})

const User = mongoose.model('users', userSchema)

module.exports = User;