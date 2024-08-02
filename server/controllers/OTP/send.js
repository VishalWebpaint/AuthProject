const sendMail = require("../../util/mail");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const otp = generateOTP();
    req.session = otp
    console.log(req.session,'jjjjjjjjj')
    const mailOptions = {
      from: 'vishal.webpaintech@gmail.com',
      to: email,
      subject: 'Your OTP',
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    };

    await sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'OTP sent successfully' , otp:otp});
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, error:error.message });
  }
};

module.exports = sendOTP;
