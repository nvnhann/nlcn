const sql = require('./db');

const HoaDon = function (hoadon) {
    this.email_paypal = hoadon.email_paypal;
    this.tong_gia = hoadon.tong_gia;
    this.idtk = hoadon.idtk;
    this.trang_thai = hoadon.trang_thai;
    this.iddc = hoadon.iddc;
}

HoaDon.create = (newHoaDon, rs) => {
    sql.query("INSERT INTO hoa_don SET ?", newHoaDon, (err, data) => {
        if (err) return rs(err, null);
        rs(null, data);
    })
};

HoaDon.getIdDesc = (rs) => {
    sql.query("SELECT idhd FROM hoa_don ORDER BY idhd DESC LIMIT 1;", (err, data) => {
        if (err) return rs(err, null);
        rs(null, data[0]);
    })
}

HoaDon.getById = (idtk, rs) => {
    sql.query("SELECT * FROM hoa_don WHERE idtk = ?", idtk, (err, data) => {
        if (err) return rs(err, null);
        rs(null, data)
    })
}

HoaDon.getAll = (q, rs) => {

    let qr = "";
    if (!q.search) qr = "SELECT *,  (SELECT COUNT(idhd) FROM hoa_don) as so_luong from hoa_don hd left JOIN dia_chi dc ON hd.iddc = dc.iddc ";
    else qr = "SELECT *, (SELECT * from hoa_don hd left JOIN dia_chi dc ON hd.iddc = dc.iddc WHERE hd.idhd LIKE '%" + q.search + "%' OR email_paypal LIKE '%" + q.search + "%' OR tong_gia LIKE '%" + q.search + "%' OR hd.idtk LIKE '%" + q.search + "%' OR hoten LIKE '%" + q.search + "%' OR thoi_gian LIKE '%" + q.search + "%') as so_luong from hoa_don hd left JOIN dia_chi dc ON hd.iddc = dc.iddc WHERE hd.idhd LIKE '%" + q.search + "%' OR email_paypal LIKE '%" + q.search + "%' OR tong_gia LIKE '%" + q.search + "%' OR hd.idtk LIKE '%" + q.search + "%' OR hoten LIKE '%" + q.search + "%' OR thoi_gian LIKE '%" + q.search + "%'";
    if (q.tong_gia) qr += "ORDER BY tong_gia " + q.tong_gia;
    else if (q.thoi_gian) qr += "ORDER BY thoi_gian " + q.thoi_gian;
    else qr += "ORDER BY hd.idhd DESC ";
    if(q.page){
        const start = (q.page - 1) * 10;
        const end = q.page * 10;
        qr += " LIMIT " + start + "," + end + "";
    }
    console.log(qr);
    sql.query(qr, (err, data) => {
        if (err) return rs(err, null);
        rs(null, data)
    })
}

HoaDon.huy = (idhd, rs) => {
    sql.query("UPDATE hoa_don SET trang_thai = ? WHERE idhd = ?", [3, idhd], (err, data) => {
        if (err) return rs(err, null);
        if (data.affectedRows === 0) return rs({kind: 'not_found'}, null);
        rs(null, data)
    })
}

HoaDon.XacNhan = (idhd, rs) => {
    sql.query("UPDATE hoa_don SET trang_thai = ? WHERE idhd = ?", [2, idhd], (err, data) => {
        if (err) return rs(err, null);
        if (data.affectedRows === 0) return rs({kind: 'not_found'}, null);
        rs(null, data)
    })
}

HoaDon.XacNhanHuy = (idhd, rs) => {
    sql.query("UPDATE hoa_don SET trang_thai = ? WHERE idhd = ?", [4, idhd], (err, data) => {
        if (err) return rs(err, null);
        if (data.affectedRows === 0) return rs({kind: 'not_found'}, null);
        rs(null, data)
    })
}

module.exports = HoaDon;