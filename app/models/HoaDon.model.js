const sql = require('./db');

const HoaDon = function (hoadon){
    this.email_paypal = hoadon.email_paypal;
    this.tong_gia = hoadon.tong_gia;
    this.idtk = hoadon.idtk;
    this.thoi_gian = hoadon.thoi_gian;
    this.trang_thai = hoadon.trang_thai;
    this.iddc = hoadon.iddc;
}

HoaDon.create = (newHoaDon, rs)=>{
    sql.query("INSERT INTO hoa_don SET ?", newHoaDon, (err, data)=>{
        if(err) return rs(err,null);
        rs(null, data);
    })
};

HoaDon.getIdDesc = (rs)=>{
    sql.query("SELECT idhd FROM hoa_don ORDER BY idhd DESC LIMIT 1;", (err, data)=>{
        if(err) return rs(err, null);
        rs(null, data[0]);
    })
}

HoaDon.getById=(idtk, rs)=>{
    sql.query("SELECT * FROM hoa_don WHERE idtk = ?", idtk, (err,data)=>{
        if(err) return rs(err, null);
        rs(null, data)
    })
}

HoaDon.getAll = (rs)=>{
    sql.query("SELECT * from hoa_don hd left JOIN dia_chi dc ON hd.iddc = dc.iddc;", (err, data)=>{
        if(err) return rs(err, null);
        rs(null, data)
    })
}

HoaDon.huy = (idhd, rs) =>{
    sql.query("UPDATE hoa_don SET trang_thai = ? WHERE idhd = ?",[3, idhd], (err, data)=>{
        if(err) return rs(err, null);
        if(data.affectedRows === 0) return rs({kind: 'not_found'}, null);
        rs(null, data)
    })
}

HoaDon.XacNhan = (idhd, rs)=>{
    sql.query("UPDATE hoa_don SET trang_thai = ? WHERE idhd = ?",[2, idhd],(err, data)=>{
        if(err) return rs(err, null);
        if(data.affectedRows === 0) return rs({kind: 'not_found'}, null);
        rs(null, data)
    })
}

HoaDon.XacNhanHuy =(idhd,rs)=>{
    sql.query("UPDATE hoa_don SET trang_thai = ? WHERE idhd = ?", [4, idhd], (err,data)=>{
        if(err) return rs(err, null);
        if(data.affectedRows === 0) return rs({kind: 'not_found'}, null);
        rs(null, data)
    })
}

module.exports = HoaDon;