const sql = require('./db');

const TacGia = function (tacgia) {
    this.hotentg = tacgia.hotentg;
    this.dia_chi = tacgia.dia_chi;
};

TacGia.create = (newTacgia, rs) => {
    sql.query(
        'INSERT INTO `tac_gia` SET ?',
        newTacgia,
        (err, _) => {
            if (err) {
                console.log(err);
                return rs(err, null);
            }
            rs(null, {...newTacgia});
        }
    );
};

TacGia.getAll = (q, rs) => {

    const start = (q.page - 1) * 8;
    const end = q.page * 8;
    let qr = "SELECT tac_gia.*, (SELECT COUNT(idtg) FROM `tac_gia`) as so_luong FROM `tac_gia`";
    if(q.hotentg === "DESC"){
        qr += "ORDER BY hotentg "+q.hotentg;
    }

    else{
        qr += "ORDER BY SUBSTRING(idtg,4) * 1 "+q.idtg;
    }

    qr += " LIMIT " + start + "," + end + "";
    console.log(qr)
    sql.query(qr, (err, data) => {
        if (err) {
            console.log(err);
            return rs(err, null);
        }
        rs(null, data);
    });
};

TacGia.delete = (idtg, rs) => {
    sql.query('DELETE FROM `tac_gia` WHERE `tac_gia`.`idtg` = ?', idtg, (err, data) => {
        if (err) {
            console.log(err);
            return rs(err, null);
        }
        if (data.affectedRows === 0) return rs({kind: 'not_found'}, null);
        rs(null, data);
    });
};

TacGia.update = (idtg, newTacgia, rs) => {
    sql.query(
        'UPDATE `tac_gia` SET ? WHERE `tac_gia`.`idtg` = ?',
        [newTacgia, idtg],
        (err, data) => {
            if (err) {
                console.log(err);
                return rs(err, null);
            }
            if (data.affectedRows === 0) return rs({kind: 'not_found'}, null);
            rs(null, data);
        }
    );
};

module.exports = TacGia;
