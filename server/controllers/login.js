
const User = require("../model/SignUp")
const bcrypt = require("bcrypt")

const login = async(req,res) => {
    try{
        const {email, password} = req.body
        console.log( password,'akfdsgsdfgsdffhkasdh')
        console.log( email,'dafh')
        if(!email || !password){
            return res.status(200).json("All fields are required")
        }
        const userExist = await User.findOne({email: email})
        console.log(userExist,'dkfdhh')
        if(!userExist) return res.status(400).json("Invalid credential")
            
        const isPasswordValid = await bcrypt.compare(password, userExist.password)
        if(isPasswordValid){
            res.status(200).json(
                {
                message:"Login successfull",
                token:await userExist.generateToken(),
            })
        }else{
            res.status(401).json({message:"Invalid email or password"})
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}
module.exports = login
