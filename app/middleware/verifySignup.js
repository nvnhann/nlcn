const User = require('../models/user.model');

const checkDuplicateEmail = (req, res, next)=>{
    User.findEmail(req.body.email, (err, email)=>{
        if(!!email){
          return res.status(400).send({message: 'Email đã đăng ký!'});
        } next();
    })
}

const checkExistEmail = (req, res, next)=>{
    User.findEmail(req.body.email, (err, email)=>{
        console.log(email)
        if(!email){
            return res.status(400).send({message: 'Email không tồn tại!'});
        } next();
    })
}

const verifySignup = {
    checkDuplicateEmail : checkDuplicateEmail,
    checkExistEmail: checkExistEmail
};

module.exports = verifySignup;
