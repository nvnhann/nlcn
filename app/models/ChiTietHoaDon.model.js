const sql = require('./db');

const ChiTietHD = function (chitiethd){
    this.id_cthd = chitiethd.id_cthd;
    this.idhd = chitiethd.idhd;
    this.so_luong = chitiethd.so_luong;
    this.gia = chitiethd.gia;
    this.idsach = chitiethd.idsach;
    this.phan_tram = chitiethd.phan_tram;
}

ChiTietHD.create = (newCTHD, rs)=>{
    sql.query("INSERT INTO chi_tiet_hd SET ?", newCTHD, (err, data)=>{
        if(err) return rs(err, null);
        rs(null, data);
    })
}

ChiTietHD.getById = (idtk, rs)=>{
    sql.query("SELECT ct.*, s.tensach from hoa_don hd LEFT JOIN chi_tiet_hd ct ON hd.idhd = ct.idhd  LEFT JOIN sach s ON s.idsach = ct.idsach  WHERE hd.idtk = ?",
        idtk, (err, data)=>{
            if (err) return rs(err,null);
            rs(null,data)
        })
}

ChiTietHD.getAll = (rs)=>{
    sql.query("SELECT ct.*, s.tensach, s.hinhanh from hoa_don hd LEFT JOIN chi_tiet_hd ct ON hd.idhd = ct.idhd  LEFT JOIN sach s ON s.idsach = ct.idsach", (err, data)=>{
            if (err) return rs(err,null);
            rs(null,data)
        })
}

module.exports = ChiTietHD;