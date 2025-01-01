const express = require("express");
const { uploadImage, getImages, removeImage, getImage, getImagesList, editImage } = require("../controller/imageController");
const uplaod = require('./../middelware/multer-upload');
const { protect } = require("../middelware/protect");
const router = express.Router();

router.route('/')
    .get(getImages)
    .post(protect,uplaod.single('image'), uploadImage)

router.route('/list')
    .get(getImagesList)

router.route('/:id')
    .get(getImage)
    .delete(protect, removeImage)
    .put(protect,uplaod.single('image'),editImage)

module.exports = router;    