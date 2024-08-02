const bcrypt = require('bcrypt');
const UserSignUp = require('../model/SignUp');
const User = require("../model/SignUp")
const { genSalt } = require('bcrypt')

const signUp = async (req, res) => {
    try {
        const { username, password, phoneNumber, email } = req.body;

        if (!username || !password || !phoneNumber || !email) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const userExist = await UserSignUp.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);

        const createUser = await UserSignUp.create({ username, email, phoneNumber, password: hashPassword });

        const token = await createUser.generateToken();

        res.status(200).json({
            data: createUser,
            token: token,
            msg: "SignUp successful"
        });

    } catch (error) {
        console.error("Error in signUp:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const login = async(req,res) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(200).json("All fields are required")
        }
        const userExist = await User.findOne({email: email})
        if(!userExist) return res.status(400).json("Invalid credential")
            
        const isPasswordValid = await bcrypt.compare(password, userExist.password)
        if(isPasswordValid){
            res.status(200).json(
                {
                data:userExist,
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

const deleteUser = async(req, res)=> {
    try{
        const userId = req.params.id
        const remove = await User.findByIdAndDelete(userId)

        if(!remove){
            res.status(500).json("Internal Server Error")
        }
        res.status(200).json({
            msg:"User Deleted Successfully",
            deletedUser: remove
        })
    }catch(error){
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

const update = async (req, res) => {
    try {
        const userId = req.params.id;
        
        if (req.body.password) {
            const saltRound = 10;
            req.body.password = await bcrypt.hash(req.body.password, saltRound);
        }
        
        const response = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!response) {
            return res.status(404).json("User Not found");
        }

        res.status(200).json({
            msg: "Data Updated",
            UserData: response
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};
module.exports = {signUp, login, deleteUser, update};