const Profile = require('../models/profile.model');
const User = require("../models/user.model");

exports.create = (req, res) =>{
    if (!req.body) {
        res.status(400).send({
            message: 'content can not be empty',
        });
    }

    const profile = new Profile({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        phone: req.body.phone,
        idtk: req.idtk
    });

    Profile.create(profile, (err,rs)=>{
        if(err){
            return res.status(500).send({
                message: err
            });
        }
        res.send({rs})
    })
}

exports.get = (req, res) =>{
    Profile.get(req.idtk, (err, rs)=>{
        if(err) {
            return res.status(500).send({message: err})
        }
        else res.send(rs)
    })
}

exports.updateEmail = (req, res)=>{
    Profile.updateEmail(req.body.email, req.params.idtk, (err, rs)=>{
        if(err){
            console.log(err);
            return res.status(500).send({
                message: err
            })
        }
        res.send({rs})
    })
}