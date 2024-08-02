const User = require("../model/SignUp");
const bcrypt = require("bcrypt");

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

module.exports = update;
