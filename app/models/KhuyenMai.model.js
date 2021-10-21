const sql =require("./db");
const KhuyenMai = function (km){
    this.idkm = km.idkm;
    this.phan_tram = km.phan_tram;
    this.ngay_bd_km = km.ngay_bd_km;
    this.ngay_het_km = km.ngay_het_km;
    this.idsach = km.idsach;
}

KhuyenMai.create = (khuyemai,rs)=>{
    sql.query("INSERT INTO khuyen_mai SET ?", khuyemai, (err, data)=>{
        if(err) return rs(err, null);
        return rs(null, data);
    })
}

KhuyenMai.getAll = (rs)=>{
    sql.query("SELECT sach.tensach, khuyen_mai.idkm, khuyen_mai.phan_tram, khuyen_mai.ngay_bd_km, khuyen_mai.ngay_het_km, sach.idsach FROM `khuyen_mai` LEFT JOIN sach ON khuyen_mai.idsach = sach.idsach; ", (err, data)=>{
        if(err) return rs(err, null);
        rs(null,data);
    })
};

KhuyenMai.update = (idkm,khuyenmai, rs) =>{

    sql.query("UPDATE khuyen_mai SET phan_tram = ?,ngay_bd_km = ?, ngay_het_km = ?, idsach = ? WHERE idkm = ?",
        [khuyenmai.phan_tram,khuyenmai.ngay_bd_km, khuyenmai.ngay_het_km, khuyenmai.idsach, idkm],(err, data)=>{
            if(err) return rs(err, null);
            if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
            rs(null,data);
        })
}

KhuyenMai.delete = (idkm, rs)=>{
    sql.query("DELETE FROM khuyen_mai WHERE idkm=?",idkm, (err,data)=>{
        if(err) return rs(err, null);
        if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
        rs(null,data);
    })
}
module.exports = KhuyenMai;