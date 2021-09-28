const nodemail = require('nodemailer');
const adminEmail = 'nvnhan.conf@gmail.com';
const adminPassword = 'Nguyen.nhan20nro';
const mailHost = 'smtp.gmail.com';
const mailPort = 587;

/**
 *
 *
 * @param to
 * @param subject
 * @param htmlcontent
 * @returns {*}
 */
module.exports= function (to, subject, htmlcontent){
    const transporter = nodemail.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth:{
            user: adminEmail,
            pass: adminPassword
        }
    })

    const options = {
        from: adminEmail,
        to: to,
        subject: subject,
        html: htmlcontent

    }
    return transporter.sendMail(options);
}