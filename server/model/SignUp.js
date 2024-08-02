const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSignUpSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Generating token
UserSignUpSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            { _id: this._id.toString(),
                email:this.email
             },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '30d' }
        );
    } catch (error) {
        console.log("Error in generateToken:", error.message);
    }
};

const UserSignUp = mongoose.model('UserSignUp', UserSignUpSchema);
module.exports = UserSignUp;
