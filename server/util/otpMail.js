const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "vishal.webpaintech@gmail.com",
        pass: "rfyp agvu ceaf uqah"
      }
    });

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
