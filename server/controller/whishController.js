const Image = require('./../models/imageSchema')
const Whish = require('./../models/whishSchema')

// GET WHISH ITEMS 
exports.getWhishList = async(req,res)=>{
    const user = req.user;
    const whishImages = await Whish.find({user : user?._id}).select('image')
    const imagesArray = whishImages.map(item => item.image);
    res.status(200).json({
        status : "success",
        data : { images : imagesArray} 
    })
}

// SAVE WHISH LIST ITEM
exports.saveWhishList = async(req,res)=>{
    try{
        const user = req.user;
        const { id } = req.body;
        let image = await Image.findById(id)
        if(!image) return res.status(404).json({ status : "fail", error : 'Image not found!'})
        let whishImage = await Whish.findOne({ user : user?._id, image : image?._id})
        if(!whishImage){
            whishImage = await Whish.create({user : user?._id, image : image?._id})
            return res.status(201).json({
                status : "success",
                data : { image : whishImage?.image } 
            })
        }
        whishImage = await Whish.findByIdAndDelete(whishImage?._id)
        res.status(201).json({
            status : "success",
            data : { image : null } 
        })
    }catch(err){
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    } 
}