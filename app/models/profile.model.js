const sql = require('./db');

const Profile = function (profile){
    this.lastname = profile.lastname;
    this.firstname = profile.firstname;
    this.phone = profile.phone;
    this.idtk = profile.idtk;
}

Profile.create = (newProfile, rs) =>{
    sql.query("INSERT INTO `thong_tin_tk` (`ho`, `ten`, `sdt`, `idtk`) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE `ho` = ?, `ten` = ?, `sdt`= ?",
        [newProfile.lastname, newProfile.firstname, newProfile.phone, newProfile.idtk, newProfile.lastname, newProfile.firstname, newProfile.phone],(err,_)=>{
        if(err){
            console.log(err);
            return rs(err, null);
        }
        rs(null, {...newProfile});
        console.log('Create proflie successfully!');
    })
}

Profile.get = (idtk, rs)=>{
    sql.query(`SELECT ho, ten, sdt from thong_tin_tk where thong_tin_tk.idtk = '${idtk}'`, (err,res)=>{
        if(err){
            console.log(err);
            return rs(err, null)
        }
        if(res.length){
            return rs(null, res[0]);
        }
        rs({kind: 'not_found'}, null);
    })
}
Profile.updateEmail = (email, idtk, res) =>{
    sql.query("UPDATE tai_khoan SET email = ? WHERE idtk = ?", [email,idtk], (err, _)=>{
        if(err){
            console.log(err);
            return res(err, null);
        }
        res(null, {...email})
    })
}
module.exports = Profile;