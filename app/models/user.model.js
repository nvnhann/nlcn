const sql = require('./db');
const bcrypt = require('bcryptjs');

const User = function (user) {
    this.email = user.email;
    this.password = bcrypt.hashSync(user.password, 8);
};

User.create = (newUser, rs) => {
    sql.query("INSERT INTO tai_khoan(email, mat_khau) VALUES (?,?)", [newUser.email, newUser.password], (err, _) => {
        if (err) {
            console.log(err);
            return rs(err, null);

        } else {
            //   console.log('Create user: ', {...newUser});
            rs(null, {...newUser})
        }
    })
}
User.findEmail = (email, rs) => {
    sql.query(`SELECT * FROM tai_khoan WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log(err);
            return rs(err, null);
        }
        if (res.length) {
            return rs(null, res[0]);
        }
        rs({kind: 'not_found'}, null);
    })
}

User.getRole = (idtk, res) => {
    sql.query(`SELECT quyen from tai_khoan where idtk = '${idtk}'`, (err, rs) => {
        if (err) {
            console.log('err: ' + err);
            return res(err, null);
        }
        if (rs.length) {
            return res(null, rs[0]);
        }
        res({kind: 'not_found'}, null);
    })
}

User.findPwd = (idtk, res) => {
    sql.query(`SELECT mat_khau FROM tai_khoan WHERE idtk = '${idtk}'`, (err, rs) => {
        if (err) {
            console.log(err)
            return res(err, null);
        }
        if (rs.length) {
            return res(null, rs[0]);
        }
        res({kind: 'not_found'}, null);
    })
}

User.getAll = (q, rs) => {

    const start = (q.page - 1) * 8;
    const end = q.page * 8;
    let qr = "";
    if(q.search) {
        qr = "SELECT tk.idtk, tk.email, tttk.hoten, tttk.sdt, (SELECT COUNT(tk.idtk) from tai_khoan as tk LEFT JOIN thong_tin_tk AS tttk ON tk.idtk = tttk.idtk WHERE tk.quyen <> 'ADMIN' AND tk.idtk LIKE '%" + q.search + "%' OR tttk.hoten LIKE '%" + q.search + "%') as so_luong from tai_khoan as tk LEFT JOIN thong_tin_tk AS tttk ON tk.idtk = tttk.idtk WHERE tk.quyen <> 'ADMIN' AND tk.idtk LIKE '%" + q.search + "%' OR tttk.hoten LIKE '%" + q.search + "%'"
    }
    else qr = "SELECT tk.idtk, tk.email, tttk.hoten, tttk.sdt, (SELECT COUNT(idtk) from tai_khoan WHERE quyen <> 'ADMIN') as so_luong from tai_khoan as tk LEFT JOIN thong_tin_tk AS tttk ON tk.idtk = tttk.idtk WHERE tk.quyen <> 'ADMIN' ";

    if(q.hoten){
        qr += "ORDER BY tttk.hoten "+q.hoten;
    }

    else{
        qr += "ORDER BY SUBSTRING(tk.idtk,6) * 1 "+q.idtk;
    }

    qr += " LIMIT " + start + "," + end + "";
    console.log(qr)
    sql.query(qr, (err,data)=>{
        if (err) return rs(err, null);
        rs(null,data)

    })
}

User.changPwd = (idtk,pwd, result) =>{
    sql.query("UPDATE tai_khoan SET mat_khau = ? WHERE idtk = ? ", [bcrypt.hashSync(pwd), idtk], (err, res)=>{
        if (err) {
           return result(err, null);
        }
        result(null, res);
    })
}

User.changPwdByEmail = (email,pwd, result) =>{
    sql.query("UPDATE tai_khoan SET mat_khau = ? WHERE email = ? ", [bcrypt.hashSync(pwd), email], (err, res)=>{
        if (err) {
            return result(err, null);
        }
        result(null, res);
    })
}

User.delete =(idtk, result) =>{
    sql.query("DELETE FROM tai_khoan WHERE idtk = ? ", idtk, (err, res) => {
        if (err) return result(err, null);
        if (res.affectedRows == 0) return result({ kind: "not_found" }, null);
        result(null, res);
    });
}


module.exports = User;