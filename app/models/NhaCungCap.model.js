const sql = require('./db');

const NhaCungCap = function (nhacungcap) {
    this.tenncc = nhacungcap.tenncc;
    this.dia_chi = nhacungcap.dia_chi;
};

NhaCungCap.create = (newNhacungcap, rs) => {
    sql.query(
        'INSERT INTO nha_cung_cap SET ?',
        newNhacungcap,
        (err, _) => {
            if (err) {
                console.log(err);
                return rs(err, null);
            }
            rs(null, {...newNhacungcap});
        }
    );
};

NhaCungCap.getAll = (rs) => {
    sql.query('SELECT * FROM nha_cung_cap', (err, data) => {
        if (err) {
            console.log(err);
            return rs(err, null);
        }
        rs(null, data);
    });
};

NhaCungCap.delete = (idncc, rs) => {
    sql.query('DELETE FROM `nha_cung_cap` WHERE `nha_cung_cap`.`idncc` = ?', idncc, (err, data) => {
        if (err) {
            console.log('error: ', err);
            return rs(err, null);
        }

        if (data.affectedRows === 0) {
            // not found nxb with the id
            return rs({kind: 'not_found'}, null);
        }
        console.log('deleted ncc with id: ', idncc);
        rs(null, data);
    });
};

NhaCungCap.update = (idncc, newNhacungcap, rs) => {
    sql.query(
        'UPDATE `nha_cung_cap` SET ? WHERE `nha_cung_cap`.`idncc` = ?',
        [newNhacungcap, idncc],
        (err, data) => {
            if (err) {
                console.log('error: ', err);
                return rs(err, null);
            }

            if (data.affectedRows === 0) {
                // not found nxb with the id
                return rs({kind: 'not_found'}, null);
            }
            console.log('update ncc with id: ', idncc);
            rs(null, data);
        }
    );
};
module.exports = NhaCungCap;
