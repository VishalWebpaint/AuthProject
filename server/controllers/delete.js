const User = require("../model/SignUp")

const deleteUser = async(req, res)=> {
    try{
        const userId = req.params.id
        const remove = await User.findByIdAndDelete(userId)

        if(!remove){
            res.status(500).json("Internal Server Error")
        }
        console.log("User Deleted Successfully")
        res.status(200).json({
            msg:"User Deleted Successfully",
            deletedUser: remove
        })
    }catch(error){
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

module.exports = deleteUser
