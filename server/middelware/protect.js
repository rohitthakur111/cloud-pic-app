const secret = "secret"
const jwt = require('jsonwebtoken'); 
const User = require('../models/userSchema');

exports.protect = async(req,res,next)=>{
    let token ;
    if(!req?.headers?.authorization)  return res.status(400).json({ status : 'fail', error : 'Login again!'}) 

    let { authorization } = req?.headers;
    authorization = authorization?.split(' ')
    token = authorization[1]
    if(!token || token ==="null") return res.status(400).json({ status : 'fail', error : 'Login again!'}) 
    try{
        var decoded = jwt.verify(token, secret);
        if(!decoded) return res.status(400).json({ status : 'fail', error : 'Login again!'}) 
        const user = await User.findById(decoded?.data.user)
        req.user = user
        next()
    }catch(err){
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    }
   
}