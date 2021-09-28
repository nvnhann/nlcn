const User = require('../models/user.model');
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) =>{
    if (!req.body) {
        res.status(400).send({
            message: 'content can not be empty',
        });
    }
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        else {
            const token = jwt.sign({idtk: data.idtk}, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.send({
                USER: {
                    email: data.email,
                    role: 'USER',
                    id: data.idtk
                },
                accessToken: token
            });
        }
    });
}

exports.login = (req, res) =>{
    User.findEmail(req.body.email, (err,data)=>{
        if(err){
            return res.status(404).send({message: 'Email không tồn tại!'})
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            data.mat_khau
        );
        if(!passwordIsValid){
            return res.status(401).send({
                message: 'Mật khẩu không chính xác!',
                accessToken: null
            })
        }
        const token = jwt.sign({idtk: data.idtk}, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        console.log(data)
        res.status(200).send({
            USER: {
                email: data.email,
                role: data.quyen,
                id: data.idtk
            },
            accessToken: token
        })
    })
}

exports.getAll = (req, res)=>{
    User.getAll((err,data)=>{
        if (err){
            console.log(err)
            return res.status(500).send({message: err});

        }
        res.send(data)
    })
}

