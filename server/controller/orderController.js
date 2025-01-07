const Image = require('./../models/imageSchema')
const Order = require('./../models/orderSchema')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

let success_url = process.env.SUCCESS_URL
let cancel_url = process.env.CANCEL_URL

// Create Order 
exports.makePayment = async(req,res)=>{
    const { id } = req.body;
    const user = req.user;
    try{
        const image = await Image.findById(id)
        if(!image)return res.status(404).json({ status : "fail", error : "Image not Found"})

        let order = await Order.findOne({ image : id, user : user?._id})
        if(order) return res.status(400).json({status : "fail", 'error' : 'Order alredy placed'})

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: [{
                    price_data: {
                        currency: image?.currency || 'usd',
                        product_data: {
                            name: image.title,
                            images : [image?.imageUrl]
                        },
                        unit_amount: image.price * 100,
                    },
                    quantity: 1,
                }],
                success_url: `${success_url}/${id}?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${cancel_url}/${id}`, 
            });
    
            res.json({ id: session.id, url: session.url });
        
    }catch(err){    
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    } 
}

// Confirm payment
exports.confirmPayment = async(req,res)=>{
    try{
        const { sessionId } = req.params;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        res.json({ status: session.payment_status });

    }catch(err){    
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    } 
}

// Create new order
exports.makeOrder = async(req,res)=>{
    try{
        const user = req.user;
        const { sessionId,id } = req.body;

        const image = await Image.findById(id)
        if(!image) return res.status(404).json({ status : "fail", error : "Image not Found"})

        let order = await Order.findOne({ sessionId })
        if(order) return res.status(400).json({status : "fail", 'error' : 'Order alredy placed'})

        order = await Order.create({  user : user?._id, image : id, sessionId, paymentStatus : 'paid', price : image?.price, currency : image?.currency})
        order = await Order.findById(order?._id).select("image").populate("image")

        res.status(201).json({
            status : "success",
            data : { order : order }
        })
    }catch(err){    
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    } 
}

// Get All order
exports.getOrder = async(req,res)=>{
    const user = req.user;
    try{
        const orders = await Order.find({ user : user?._id}).select("image").populate("image")
        const orderFilter = orders.filter(order => order.image !== null)
        res.status(200).json({
           status : "success",
           data : { order : orderFilter } 
        })
    }catch(err){    
        res.status(500).json({
            status : "fail",
            error : err.message
        })
    } 
}