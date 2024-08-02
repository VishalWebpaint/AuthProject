const express = require("express")
const app = express()
require("dotenv").config();
const connectDb = require('./config/db');
const router = require("./routes/routes");
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials:true
}))
app.use('/user',router)
const Port = process.env.PORT || 8080
connectDb()
app.listen(Port, ()=> {
    console.log(`Listening at ${Port}`)
})