const User = require("../models/userSchema");
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const secret = "secret"
const cloudinary = require('cloudinary').v2;
const { OAuth2Client } = require('google-auth-library')
const crypto = require("crypto");
const sendEmail = require("../email/mail");
const client = new OAuth2Client(process.env.CLIENT_ID)
const resetPassword = require("../email/resetEmail");
const resetEmail = require("../email/resetEmail");
const registerEmail = require("../email/registerEmail");

const NODE_PROD_ENV = process.env.NODE_PROD_ENV || false;
const CLIENT_URL = NODE_PROD_ENV ? "https://cloud-pic-app.vercel.app" : "http://localhost:5173";

const encodePassword = (password)=> bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const  generateRandomPassword=(length) =>{
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create token 
const signToken = (user) => {
    return jwt.sign(
        {
            data: {
                user: user?._id
            }
        },
        secret,
        { expiresIn: '1d' }
    );
};

// compare password 
const comparePassword = (password,passwodDB)=> bcrypt.compareSync(password, passwodDB);

// 1. Create User 
exports.register = async(req,res)=>{
    try{
        const { userName, email, password } = req.body;
        // field is empty
        if(!userName || !email || !password)
            return res.status(400).json({
                status : "fail",
                error : 'All fields are required!'
            })
        // check user exist
        let user = await User.findOne({ email })
        if(user) 
            return res.status(400).json({
                status : "fail",
                error : 'Email address is already exists!'
             })
        // create user 
        const salt = bcrypt.genSaltSync(10); 
        const hashPassword = bcrypt.hashSync(password, salt);
        user = new User({ userName, email, password : hashPassword })
        user = await user.save();
        const token = signToken(user)

        user = await User.findById(user?._id)
        res.status(201).json({
            status : "success",
            data : {token, user}
        })
        try{
            const subject ="Registration Successful - Welcome to Pic Nest!"
            const message = `User Name : ${userName} <br>Email : ${email}`
            await sendEmail(userName, email, message, subject, registerEmail)
        }catch(err){
            console.log(err)
        }
    }catch(err){
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    }
}

// 2. Login User
exports.login = async(req,res)=>{
    try{
        const { email, password } = req.body;
        if(!email || !password)
            return res.status(400).json({
                status : "fail",
                error : 'Login with valid credential!'
            })
        let user = await User.findOne({ email }).select("+password")
        if(!user || !comparePassword(password,user.password)){
            return res.status(400).json({
                status : "fail",
                error : 'Login with valid credential!'
            })
        }
        delete user.password
        const token = signToken(user)
        res.status(201).json({
           status : "success",
           data : {token, user}
        })
       
    }catch(err){
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    }
}

// Get user 
exports.getUser = async(req,res)=>{
    const user = req.user;
    res.status(200).json({
        status : "success",
        data : {user}
    })
}

// Google Login
exports.googleLogin = async(req,res)=>{
    try{
        const { token }  = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();  
        let user = await User.findOne({ email })
        if(!user){
            const password = generateRandomPassword(8)
            const salt = bcrypt.genSaltSync(10); 
            const hashPassword = bcrypt.hashSync(password, salt);
            user = await User.create({ userName : name, email, password : hashPassword,  profilePicture : picture})
        }
        const loginToken = signToken(user)
        delete user.password
        res.status(201).json({
           status : "success",
           data : { token : loginToken, user}
        })

    }catch(err){
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    }
}

// Update user 
exports.updateMe = async (req,res)=>{
    try{
        const file = req.file;
        const user = req.user;
        delete req.body?.email
        delete req.body?.password

        if(req.body?.location){
            if(!req.body?.location?.city) req.body.location.city = user?.location?.city
            if(!req.body?.location?.country) req.body.location.country = user?.location?.country
        }
        const publicId  = req.user?.public_id
        if(!file){
            const updatedUser = await User.findByIdAndUpdate(user._id, {...req.body }, {new : true} )
            res.status(201).json({
                status : "success",
                data : { user : updatedUser}
            })
        }else{
            const result = await cloudinary.uploader.upload_stream({ folder: '/cloud/users' }, async (error, result) => {
                if (error) {
                    return res.status(500).json({ status: "fail", error: error.message });
                }
                req.body.public_id  = result.public_id;
                req.body.profilePicture = result?.secure_url;
                const updatedUser = await User.findByIdAndUpdate(user._id, {...req.body}, {new : true} )
                res.status(201).json({
                    status : "success",
                    data : { user : updatedUser}
                })
            }).end(req.file.buffer); 
        }  
        
        if(publicId){
            cloudinary.uploader.destroy(publicId, function(error, result) {
                if (error) console.log('image deleted')
            })
        }
    }catch(err){
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    }
}

// update password
exports.updatePassword = async (req,res)=>{
    const userId = req.user.id;
    const {currentPassword, newPassword, confirmPassword} = req.body
    if(!currentPassword || !newPassword || !confirmPassword)
        return res.status(400).json({
           status : 'fail',
           error: 'All fields are required: current password, new password, and confirm password.'
        })
    if(newPassword !== confirmPassword) 
        return res.status(400).json({ status : "error", error : "new password does not match with confirm password"})         
    try{
        const user = await User.findById(userId).select("+password")
        if(!comparePassword(currentPassword, user.password))
            return res.status(400).json({ status : "error", error : "The current password is incorrect"})      
        
        const updatedUser = await User.findByIdAndUpdate(userId, { password : encodePassword(newPassword) }, { new : true } )
        const token = signToken(updatedUser)
       return res.status(200).json({
        status : "success",
        token 
       })
    }catch(err){
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    }
}

// Reset Password
exports.forgotPassword = async(req,res)=>{
    const { email } = req.body;
    if (!email || !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
        return res.status(400).json({
            status : "fail",
            error : 'Invalid email address'
        });
    }
    try{
        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status : "fail",
                error : 'No account found with that email'
            });
        }
        const token = crypto.randomBytes(32).toString('hex')
        const expiration = Date.now() + 600000 ; 
        user.resetToken = token;
        user.resetTokenExpiration = expiration;
        await user.save();
        const message = `${CLIENT_URL}/new-password?resetToken=${token}&expiration=${expiration}`
        const subject = "Password Reset Request"
        try{
            await sendEmail(user.userName, email, message, subject, resetEmail)
            return res.status(200).json({
                status : "success",
                message : "Password reset link sent to you email please check"
            })
        }catch(err){
            return res.status(400).json({
                status : "fail",
                error : err.message
            });
        }
    }catch(err){
        return res.status(400).json({
            status : "fail",
            error : err.message
        });
    }

}

exports.resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    // Both reset token and new password are required
    if (!resetToken || !newPassword) {
        return res.status(400).json({
            status: "fail",
            error: "Reset token and new password are required."
        });
    }

    try {
        // Find the user by the reset token
        const user = await User.findOne({ resetToken });
        
        // If no user is found or the reset token does not exist
        if (!user) {
            return res.status(400).json({
                status: "fail",
                error: "Invalid or expired reset token."
            });
        }

        // check if expired
        if (new Date() > user.resetTokenExpiration) {
            user.resetToken = undefined
            user.resetTokenExpiration = undefined
            await user.save()

            return res.status(400).json({
                status: "fail",
                error: "Reset token has expired."
            });
        }

        // delete it when set new password
        user.resetToken = undefined
        user.resetTokenExpiration = undefined

        user.password = encodePassword(newPassword); 

        await user.save();

        return res.status(200).json({
            status: "success",
            message: "Password has been successfully reset."
        });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            error: "An error occurred while processing your request. Please try again later."
        });
    }
};
