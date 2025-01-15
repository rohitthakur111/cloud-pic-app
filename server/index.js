const express = require("express")
const dotenv = require('dotenv').config({ path : '.env'})
const cors = require('cors')

const NODE_PROD_ENV = process.env.NODE_PROD_ENV || false;

const authRouter = require("./routes/authRoutes")
const imageRouter = require("./routes/imageRoutes")
const whishRouter = require("./routes/whishRoutes")
const orderRouter = require("./routes/orderRoutes")
const userRouter = require("./routes/userRoutes");
const contactRouter = require("./routes/contactRoutes");

const sendEmail = require("./email/mail");

const app = express()
// Middleware
app.use(express.json())
const CLIENT_URL = NODE_PROD_ENV ? "https://cloud-pic-app.vercel.app" : "http://localhost:5173";
app.use(cors({
    origin : CLIENT_URL,
    methods : "GET,POST,DELETE,PUT,PATCH",
    credentials : true
}))

// Rotes of api
app.use('/api/cloud-pic/auth', authRouter)
app.use('/api/cloud-pic/whish', whishRouter)
app.use('/api/cloud-pic/images', imageRouter)
app.use('/api/cloud-pic/checkout', orderRouter)
app.use('/api/cloud-pic/images', imageRouter)
app.use('/api/cloud-pic/users', userRouter)
app.use('/api/cloud-pic/contact', contactRouter)


app.get('/', (req,res)=>{
    res.json("Welcome to the cloud pic!")
})

app.get('/env', (req,res)=>{
    res.json(process.env.USER_GMAIL)
})




module.exports = { app };
 