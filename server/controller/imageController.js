const Image = require('./../models/imageSchema')
const url = require('url')
        
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');

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
        const targetSizeKB = 200; 
        const targetSizeBytes = targetSizeKB * 1024;

        let compressedImageBuffer;
        let quality = 80; 
        do {
            compressedImageBuffer = await sharp(req.file.buffer)
                .resize(800, 800, { fit: 'inside' }) 
                .jpeg({ quality })                  
                .toBuffer();

            if (compressedImageBuffer.length > targetSizeBytes) {
                quality -= 5; 
            }
        } while (compressedImageBuffer.length > targetSizeBytes && quality > 10); 

        const uploadPromise = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: '/cloud/images' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(compressedImageBuffer);
        });

        const uploadResult = await uploadPromise;
        const { public_id, secure_url: imageUrl } = uploadResult;
        const newImage = new Image({user : user?._id, public_id, title, description, imageUrl, price, currency,imageType });

        await newImage.save();

        res.status(201).json({
            status: "success",
            image: newImage
        });
    
    }catch(err){
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
        const user = req.user;
        let image = await Image.findById(id)
        if(!image)
            return res.status(404).json({
                status: "fail",
                error : 'image not found'                       
            })
        
        // validate unauthrize acceess
        if(user?.role !=="admin" && user.id !== image.user ) return res.status(401).json({
            status: "fail",
            error: 'Permission not allowed.'
        });

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

/**  UPDATE IMAGE AND PROTECT ROUTE */

exports.editImage = async(req,res)=>{
    const user = req.user;
    const { id } = req.params; 
    try{
        const image = await Image.findById(id);

        if(!image){
            return res.status(400).json({
                status: "fail",
                error : 'image not found' 
            })
        }
        // unauthrize request
        if(user?.role?.toLocaleLowerCase() !=="admin" && user.id !== image.user ) return res.status(401).json({
            status: "fail",
            error: 'Permission not allowed.'
        });
        if (req.file) {
            const targetSizeKB = 200; 
            const targetSizeBytes = targetSizeKB * 1024;

            let compressedImageBuffer;
            let quality = 80; 

            do {
                compressedImageBuffer = await sharp(req.file.buffer)
                    .resize(800, 800, { fit: 'inside' }) 
                    .jpeg({ quality })                  
                    .toBuffer();

                if (compressedImageBuffer.length > targetSizeBytes) {
                    quality -= 5; 
                }
            } while (compressedImageBuffer.length > targetSizeBytes && quality > 10); 

            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: '/cloud/images' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(compressedImageBuffer);
            });

            const uploadResult = await uploadPromise;
            const { public_id, secure_url: imageUrl } = uploadResult;

            // Update the image in the database
            cloudinary.uploader.destroy(image.public_id)

            const updatedImage = await Image.findByIdAndUpdate(
                id, { ...req.body, public_id, imageUrl },{ new: true } );

            return res.status(201).json({
                status: "success",
                image: updatedImage,
            });
        }

        const updatedImage = await Image.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        return res.status(200).json({
            status: "success",
            image: updatedImage,
        })
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
    // const type = req.headers.type || 'all';
    try{
        const parseUrl = url.parse(req.url, true)
        let {type, pagesize = 5,currentpage = 1} = parseUrl.query

        pagesize = pagesize >100 && pagesize<0 ? 5 : Number(pagesize)
        currentpage = currentpage < 1 ? 1 : Number(currentpage)
        const skip = (currentpage - 1) * pagesize;

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
        )
        }
        
        let totalImages = await Image.countDocuments(matchStage);
        const totalPages = Math.ceil(totalImages / pagesize);

        pipeline.push( 
            {
                $skip: skip, 
            },
            {
                $limit: pagesize,
            }
        )
        if (currentpage > totalPages) {
            return res.status(200).json({
                status: 'success',
                message: 'Page number exceeds total pages',
                currentPage: currentpage,
                totalPages,
                totalImages,
                images: [],
            });
        }
        const images = await Image.aggregate(pipeline)
       
        res.status(200).json({
            status: "success",
            images : images,
            totalPages,
            totalImages,
            images,
        }) 
    }catch(err){
        res.status(500).json({
            status: "ok",
            error : err.message
        }) 
    }
}