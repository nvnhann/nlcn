const sendMail = require('../Services/mail.service');
const otpGenerator = require('otp-generator');
const verifySignup = require('../middleware/verifySignup');

// To add minutes to the current time
function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

module.exports = function (app) {

    app.post('/email/otp',[verifySignup.checkDuplicateEmail], async (req, res) => {
        res.header('Access-Control-Allow-Credentials', true)
        const email = req.body.email;
        if (!email) {
            return res.status(400).send({message: 'Email not provided!'});
        }
        //Generate OTP
        const otp = otpGenerator.generate(6, {alphabets: false, upperCase: false, specialChars: false});
        const now = new Date();
        const timeVN = new Date(now.getTime() + 7 * 60000 * 60);
        const expiration_time = AddMinutesToDate(timeVN, 5);
        //Create OTP instance
        const subject_mail = "Rikuo For Email Verification"
        try {
           sendMail(email, subject_mail, `<div>OTP for your email verification is: <span style='color: #6b7280; font-weight: bold'>${otp}</span></div>`);
            res.cookie('otp',otp, {expires: expiration_time, httpOnly: false}).send({message: "Mã OTP đã gửi vào email bạn!"});
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err})
        }
    });


}