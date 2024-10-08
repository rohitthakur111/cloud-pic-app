const express = require("express")
const dotenv = require('dotenv').config({ path : '.env'})
const cors = require('cors')

const NODE_PROD_ENV = true;

const userRouter = require("./routes/authRoutes")
const imageRouter = require("./routes/imageRoutes")

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
app.use('/api/cloud-pic/auth', userRouter)
app.use('/api/cloud-pic/images', imageRouter)


app.get('/', (req,res)=>{
    res.json("Welcome to the cloud pic!")
})
app.get('/env', (req,res)=>{
    res.json(process.env.CLOUDINARY_CLOUD_NAME)
})

app.use('/api/cloud-pic/images', imageRouter)


module.exports = { app };
