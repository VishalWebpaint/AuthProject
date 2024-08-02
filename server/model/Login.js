const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    }
}) 
const Login = new mongoose.model("Login", loginSchema)
module.exports = Login