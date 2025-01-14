/*
    Dependices for contact query  routes 
*/
const express = require("express");
const { addContactQuery } = require("../controller/contactQuery");

const router = express.Router();

router.route('/')
    .post(addContactQuery)

module.exports = router