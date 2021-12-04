const sql = require('./db');

const NhaCungCap = function (nhacungcap) {
    this.tenncc = nhacungcap.tenncc;
    this.dia_chi = nhacungcap.dia_chi;
    this.sdt = nhacungcap.sdt;
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

NhaCungCap.getAll = (q, rs) => {

    const start = (q.page - 1) * 8;
    const end = q.page * 8;
    let qr = "";
    const idncc = q.idncc || ' ';
    if(q.search) {
        qr = "SELECT nha_cung_cap.*, (SELECT COUNT(idncc) FROM `nha_cung_cap` WHERE idncc LIKE '%" + q.search + "%' OR tenncc LIKE '%"+q.search+"%' ) as so_luong FROM `nha_cung_cap` WHERE idncc LIKE '%"+q.search+"%' OR tenncc LIKE '%"+q.search+"%'"
    }
    else qr = "SELECT nha_cung_cap.*, (SELECT COUNT(idncc) FROM `nha_cung_cap`) as so_luong FROM `nha_cung_cap`";

    if(q.tenncc){
        qr += "ORDER BY tenncc "+q.tenncc;
    }

    else{
        qr += "ORDER BY SUBSTRING(idncc,5) * 1 " + idncc || '';
    }

    if(q.page){
        qr += " LIMIT " + start + "," + end + "";
    }
    console.log(qr)

    sql.query(qr, (err, data) => {
        if (err) {
            console.log(err);
            return rs(err, null);
        }
        rs(null, data);
    });
};


NhaCungCap.getExcel = (rs)=>{
    const qr = "SELECT idncc AS \"ID nhà cung cấp\", tenncc AS \"Họ và tên\", sdt AS \"Số điện thoại\" , dia_chi AS \"Địa chỉ\" FROM `nha_cung_cap` ORDER BY SUBSTRING(idncc,5) * 1";
    sql.query(qr, (err, data) => {
        if (err) {
            console.log(err);
            return rs(err, null);
        }
        rs(null, data);
    });
}

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
