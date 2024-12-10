const Image = require('./../models/imageSchema')
        
const cloudinary = require('cloudinary').v2;
const fs = require("fs")
// Cloudinary configuration

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImage = async(filePath)=>{
    if(fs.existsSync(filePath)){
        fs.unlink(filePath, error=>{
            if(error) console.log(error.message)
        })
    }
}

// GET ALL IMAGES
exports.getImages = async(req,res)=>{
    try{
        const images = await Image.find();
        res.status(200).json({
            status: "success",
            images : images
        }) 
    }catch(err){
        res.status(500).json({
            status: "fail",
            error : err.message
        }) 
    }
}

// UPLOAD IMAGES IN CLOUD
exports.uploadImage = async(req,res)=>{
    try{
        if (!req.file) return res.status(400).json({  status: "fail", error: "No file uploaded"});
        const user = req.user;
        let { title, description,imageType,price,currency } = req.body
        if(imageType=== 'paid'){
            if(!price || !currency) return res.status(400).json({
                status: "fail",
                error : 'Price and currency is required'
            }) 
        }else {
            price = undefined;
            currency = undefined;  
        }
        const result = await cloudinary.uploader.upload_stream({ folder: '/cloud/images' }, async (error, result) => {
            if (error) {
                return res.status(500).json({ status: "fail", error: error.message });
            }

            const { public_id } = result;
            const imageUrl = result?.secure_url;
            const newImage = new Image({user : user?._id, public_id, title, description, imageUrl, price, currency,imageType });
            await newImage.save();

            res.status(201).json({
                status: "success",
                image: newImage
            });
        }).end(req.file.buffer); 
    }catch(err){
        // if(req?.file?.path) deleteImage(req.file.path)
        res.status(500).json({
            status: "fail",
            error : err.message
        }) 
    }
}

// delete imgage
exports.removeImage = async(req,res)=>{
    try{
        const { id } = req.params;
        let image = await Image.findById(id)
        if(!image)
            return res.status(404).json({
                status: "fail",
                error : 'image not found'                                                                                                                                                                                                                                       
            })
            
        const { public_id } = image;
        image =  await Image.findByIdAndDelete(image.id)

        cloudinary.uploader.destroy(public_id, function(error, result) {
            if (error) {
                return res.status(500).json({
                    status: "fail",
                    error: error.message
                });
            }

            res.status(200).json({
                status: "success",
                id,
                message: `Image with public_id ${public_id} deleted successfully`,
                result: result
            });
        });
    }catch(err){
        res.status(500).json({
            status: "fail",
            error : err.message
        }) 
    }
}

// EXPORT GET IMAGE
exports.getImage = async(req,res)=>{
    try{
        const { id } = req.params;
        const image = await Image.findById(id);
        res.status(200).json({
            status: "success",
            image : image
        }) 
    }catch(err){
        res.status(500).json({
            status: "fail",
            error : err.message
        }) 
    }
   
}

exports.getImagesList = async(req,res)=>{
    const type = req.headers.type || 'all';
    let matchStage = {};
    if (type === 'free') {
        matchStage = {
            $or: [
                { imageType: { $exists: false } }, 
                { imageType: { $ne: 'paid' } }, 
            ],
        };
    }
    if (type === 'premium') {
        matchStage = {
               imageType : 'paid'
        }
    }
    const pipeline = [
        {
            $match: matchStage, 
        },
        {
            $lookup : {
                from : 'orders',
                localField : '_id',
                foreignField : 'image',
                as : 'order'
            }
        },
        {
            $addFields : {
                orderCount : { $size : '$order'}
            }
        },
        {
            $project : {
                order : 0
            }
        }
    ]
    if(type === 'popular'){
        pipeline.push(
            {
                $sort : {
                    orderCount : -1
                }, 
            },
            {
                $limit : 10
            }
    )
    }else{
        pipeline.unshift({
            $match : matchStage
        })
    }
    pipeline.push({
        $project: {
            order: 0, 
        },
    })
    try{
        const images = await Image.aggregate(pipeline)
        res.status(200).json({
            status: "success",
            images : images
        }) 
    }catch(err){
        res.status(500).json({
            status: "ok",
            error : err.message
        }) 
    }
}