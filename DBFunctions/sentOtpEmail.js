let nodemailer = require('nodemailer');

const sentOtpEmail = async function (req, res, next) {
    console.log("Inside sentOtpEmail", req.body);

    const { email, otp } = req.body

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: 'mashup.app2021@gmail.com',
            pass: 'mashup@123'
        }
    });

    let userName = email.substr(0, email.indexOf('@'))

    let htmlcode = `<div style="background-color:#2c3e50">
    <div style="padding: 30px;color:#bdc3c7">
      <h1 style="display: flex;
    justify-content: center;">Mashup</h1>
      <h4>Dear ${userName},</h4>
  <p>Please use <span style="font-size: 25px;">${otp}</span> as your One Time Password (OTP) to log into your Mashup Account. This password is valid for 30 minutes.</p>
  <p>For security reasons, please do not share this OTP with anyone.</p>
    </div>
  </div>`

    var mailOptions = {
        from: 'Mashup<mashup.app2021@gmail.com>',
        to: email,
        subject: 'One Time Password (OTP) for logging in to your Mashup Account',
        // text: 'That was easy!',
        html: htmlcode
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.json({result: "success"})
        }
    });
}

module.exports = sentOtpEmail;