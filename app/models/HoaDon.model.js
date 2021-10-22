const sql = require('./db');

const HoaDon = function (hoadon){
    this.idhd = hoadon.idhd;
    this.email_paypal = hoadon.email_paypal;
    this.tong_gia = hoadon.tong_gia;
    this.idtk = hoadon.idtk;
    this.thoi_gian = hoadon.thoi_gian;
    this.trang_thai = hoadon.trang_thai;
}

HoaDon.create = (newHoaDon, rs)=>{
    sql.query("INSERT INTO hoa_don SET ?", newHoaDon, (err, data)=>{
        if(err) return rs(err,null);
        rs(null, data);
    })
};

HoaDon.getById=(idtk, rs)=>{
    sql.query("SELECT * FROM hoa_don WHERE idtk = ?", idtk, (err,data)=>{
        if(err) return rs(err, null);
        rs(null, data)
    })
}

module.exports = HoaDon;