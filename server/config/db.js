const mongoose = require("mongoose")

const connectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log("DB is Connected")
        
    } catch (error) {
        console.log("DB connection error")
    }
}

module.exports = connectDb