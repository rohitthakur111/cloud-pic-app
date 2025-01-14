/*
    Dependices for contact query    
*/
const sendEmail = require("../email/mail");
const Contact = require("../models/contactSchema")
const contactUsTemplate = require('../email/contactUs')

/*
    Create Contact Query Us Schema
*/

const addContactQuery = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
        res.status(400).json({
            status: "fail",
            error: 'All fields are required: name, email, and message.'
        })
    try {
        let contact = new Contact({ name, email, message })
        contact = await contact.save()
        const subject = "Contact Us - Support Request"
        try{
            await sendEmail(name, email, message, subject, contactUsTemplate)
            res.status(200).json({
                status : 'success',
                message : "We have received your request, and we will contact you soon"
            })
        }catch(err){
            res.status(500).json({
                status: "fail",
                error: err.message
            })
        }

    } catch (err) {
        res.status(500).json({
            status: "fail",
            error: err.message
        })
    }

}


module.exports = { addContactQuery };