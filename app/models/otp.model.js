const sql = require('./db');

const OTP = function (otp){
    this.email = otp.email;
    this.otp = otp.otp;
    this.expiration_time = otp.expiration_time;
}

OTP.create = (newOTP, rs)=>{
    sql.query("INSERT INTO otp(email,otp,expiration_time) VALUES (?,?,?) ON DUPLICATE KEY UPDATE otp = ?, expiration_time=?",[newOTP.email, newOTP.otp, newOTP.expiration_time, newOTP.otp, newOTP.expiration_time], (err,_)=>{
        if(err){
            return rs(err,null);
        }
        rs(null, {...newOTP});
    })
}
OTP.get = (email, rs)=>{
    sql.query(`SELECT * FROM otp WHERE email = '${email}'`,(err,data)=>{
        if(err){
            console.log(err);
            return rs(err,null)
        }
        rs(null, data[0])
        console.log(data[0]);
    })
}


module.exports = OTP;