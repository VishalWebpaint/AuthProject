const { genSalt } = require('bcrypt')
const UserSignUp = require('../model/SignUp')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try{
        const {username, password, phoneNumber, email} = req.body 
        // console.log(req.body,'akakakakakakak')
        if(!username || !password || !phoneNumber || !email){
           return res.status(200).json("All fields are required")
        }
        const userExist = await UserSignUp.findOne({email:email})
        if(userExist){
            return res.status(400).json("email already exists")
        }
        const saltRound = 10
        const hashPassword = await bcrypt.hash(password, saltRound)
        
        const createUser = await UserSignUp.create({username, email, phoneNumber, password:hashPassword})
        res.status(200).json(
            {Data:createUser, 
            token:await createUser.generateToken(),
            msg:"SignUp successfull"
            })
        
        
    }catch(error){
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

module.exports = signUp