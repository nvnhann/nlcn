const  jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const bcrypt = require('bcryptjs');

const  User = require("../models/user.model");

verifyToken = (req, res, next) =>{
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        })
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message: 'Unauthorized!'
            })
        }
        req.idtk = decoded.idtk;
        next();
    })
}

isAdmin = (req, res, next) =>{
    User.getRole(req.idtk, (err, rs)=>{
        if(err) {
            return res.status(401).send({message: 'some err' + err})
        }
        if(rs.quyen === 'ADMIN'){
            return next();
        } else {
            return res.status(403).send({message: 'Require Admin Role'})
        }
    })
}

verifyPwd = (req, res, next)=>{
    User.findPwd(req.idtk,(err, rs)=>{
        if(err) {
            return res.status(401).send({message: 'some err' + err})
        } else {
            bcrypt.compare(req.body.password, rs.mat_khau,(err, result)=>{
                if(!result){
                    return res.status(400).send({message: 'Mật khẩu không chính xác!'})
                } else return next();
            })
        }
    })

}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    verifyPwd: verifyPwd
}

module.exports = authJwt;