const sendMail = require('../Services/mail.service');
const otpGenerator = require('otp-generator');
const OTP = require('../models/otp.model');
const verifySignup = require('../middleware/verifySignup');

// To add minutes to the current time
function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

module.exports = function (app) {
    app.post('/email/otp',[verifySignup.checkDuplicateEmail], async (req, res) => {
        const email = req.body.email;
        if (!email) {
            return res.status(400).send({message: 'Email not provided!'});
        }
        //Generate OTP
        const otp = otpGenerator.generate(6, {alphabets: false, upperCase: false, specialChars: false});
        const now = new Date();
        const timeVN = new Date(now.getTime() + 7 * 60000 * 60);
        const expiration_time = AddMinutesToDate(timeVN, 5);
        //Create OTP instance in DB
        const ExporationTimes = expiration_time.toISOString().slice(0, 19).replace('T', ' ');
        const subject_mail = "Rikuo For Email Verification"
        try {
            sendMail(email, subject_mail, `<div>OTP for your email verification is: <span style='color: #6b7280; font-weight: bold'>${otp}</span></div>`);
            const OTPcreate = new OTP({
                email: email,
                otp: otp,
                expiration_time: ExporationTimes
            })
            console.log(OTPcreate)
            OTP.create(OTPcreate, (err, rs) => {
                if (err) {
                    console.log(err)
                }
                console.log(rs)
            })
            res.send({message: "Mã OTP đã gửi vào email bạn!"});

        } catch (err) {
            console.log(err);
            res.status(500).send({message: err})
        }
    });

    app.post("/email/verifyemail", async (req, res) => {
        const email = req.body.email;
        const otp = req.body.otp;

        if (!email) {
            return res.status(400).send({message: 'Email not provided!'});
        }
        if (!otp) {
            return res.status(400).send({message: 'otp not provided!'});
        }
        OTP.get(email, (err, rs) => {
            if (err) {
                res.status(500).send({message: err})
            } else {
                if (rs.otp !== otp) {
                    return res.status(500).send({message: "Mã xác nhận không hợp lệ!"});
                }
                const now = new Date();
                const currentTime = now.getTime();
                console.log(now)
                console.log(rs.expiration_time)
                if (currentTime > rs.expiration_time.getTime()) {
                    return res.status(500).send({message: "OTP đã hết hạn!"});
                }
                res.send({Message: 'Xác nhận thành công'})
            }
        })


    })
}