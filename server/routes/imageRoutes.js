const express = require("express");
const { uploadImage, getImages, removeImage, getImage } = require("../controller/imageController");
const uplaod = require('./../middelware/multer-upload');
const { protect } = require("../middelware/protect");
const router = express.Router();

router.route('/')
    .get(getImages)
    .post(protect,uplaod.single('image'), uploadImage)

router.route('/:id')
    .get(getImage)
    .delete(removeImage)

module.exports = router;    