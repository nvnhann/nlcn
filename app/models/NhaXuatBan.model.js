const sql = require('./db');

const NhaXuatBan = function (nhaxuatban) {
    this.tennxb = nhaxuatban.tennxb;
    this.dia_chi = nhaxuatban.dia_chi;
    this.sdt = nhaxuatban.sdt;
};

NhaXuatBan.create = (newNhaXuatBan, rs) => {
    sql.query(
        'INSERT INTO nha_xuat_ban SET ?',
        newNhaXuatBan,
        (err, _) => {
            if (err) {
                console.log(err);
                return rs(err, null);
            }
            rs(null, {...newNhaXuatBan});
        }
    );
};

NhaXuatBan.getAll = (q, rs) => {

    const start = (q.page - 1) * 8;
    const end = q.page * 8;
    let qr = "";
    if (q.search) {
        qr = "SELECT nha_xuat_ban.*, (SELECT COUNT(idnxb) FROM `nha_xuat_ban` WHERE idnxb LIKE '%" + q.search + "%' OR tennxb LIKE '%" + q.search + "%' ) as so_luong FROM `nha_xuat_ban` WHERE idnxb LIKE '%" + q.search + "%' OR tennxb LIKE '%" + q.search + "%'"
    } else qr = "SELECT nha_xuat_ban.*, (SELECT COUNT(idnxb) FROM `nha_xuat_ban`) as so_luong FROM `nha_xuat_ban`";

    if (q.tennxb) {
        qr += "ORDER BY tennxb " + q.tennxb;
    } else {
        qr += "ORDER BY SUBSTRING(idnxb,5) * 1 " + q.idnxb;
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

NhaXuatBan.getExcel = (rs) => {
    const qr = "SELECT idnxb AS \"ID nhà xuất bản\", tennxb AS \"Họ và tên\", sdt AS \"Số điện thoại\" , dia_chi AS \"Địa chỉ\" FROM `nha_xuat_ban` ORDER BY SUBSTRING(idnxb,5) * 1";
    sql.query(qr, (err, data) => {
        if (err) {
            console.log(err);
            return rs(err, null);
        }
        rs(null, data);
    });
}

NhaXuatBan.delete = (idnxb, rs) => {
    sql.query('DELETE FROM `nha_xuat_ban` WHERE `nha_xuat_ban`.`idnxb` = ?', idnxb, (err, data) => {
        if (err) {
            console.log('error: ', err);
            return rs(err, null);
        }

        if (data.affectedRows === 0) {
            // not found nxb with the id
            return rs({kind: 'not_found'}, null);
        }
        console.log('deleted nxb with id: ', idnxb);
        rs(null, data);
    });
};

NhaXuatBan.update = (idnxb, newNhaxuatban, rs) => {
    sql.query(
        'UPDATE `nha_xuat_ban` SET ? WHERE `nha_xuat_ban`.`idnxb` = ?',
        [newNhaxuatban, idnxb],
        (err, data) => {
            if (err) {
                console.log('error: ', err);
                return rs(err, null);
            }

            if (data.affectedRows === 0) {
                // not found nxb with the id
                return rs({kind: 'not_found'}, null);
            }
            console.log('update nxb with id: ', idnxb);
            rs(null, data);
        }
    );
};
module.exports = NhaXuatBan;
