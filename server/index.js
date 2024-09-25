const express = require("express")
const dotenv = require('dotenv').config({ path : '.env'})
const cors = require('cors')

const imageRouter = require("./routes/imageRoutes")

const app = express()

app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173',
    methods : "GET,POST,DELETE,PUT,PATCH",
    credentials : true
}))

app.use('/api/cloud-pic/images', imageRouter)
app.use('/', (req,res)=>{
    res.end("Welcome to the cloud pic!")
})

module.exports = { app };