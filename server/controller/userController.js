const User = require("../models/userSchema");

exports.getUsers = async(req,res)=>{
    const user = req.user;
    if(!user?.role && user.role?.toLocaleLowerCase() !== "admin")
        res.status(400).json({ status: "fail", error: 'Permission not allowed.'})
    try{
        let users = await User.find()
        res.status(200).json({
            status : "success",
            users 
        } )
    }catch(err){
        res.status(500).json({
            status: "fail",
            error : err.message
        }) 
    }
}
