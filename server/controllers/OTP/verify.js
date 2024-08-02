 const verifyOTP = async (req, res, next) => {
    try {
        const { otp } = req.body;
        
        if (otp) {
            res.status(200).json({ success: true, message: 'OTP verification successful' });
        } else {
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = verifyOTP