const sql = require("./db");
const Sach = function (sach) {
  this.tensach = sach.tensach;
  this.gia_sach = sach.gia_sach;
  this.hinhanh = sach.hinhanh;
  this.mo_ta = sach.mo_ta;
  this.so_luong = sach.so_luong;
  this.hinh_thuc_bia = sach.hinh_thuc_bia;
  this.trong_luong = sach.trong_luong;
  this.so_trang = sach.so_trang;
  this.idtg = sach.idtg;
  this.idnn = sach.idnn;
  this.idkt = sach.idkt;
  this.idncc = sach.idncc;
  this.idtl = sach.idtl;
  this.idnxb = sach.idnxb;
};

Sach.update = (idsach, sach, rs) => {
  sql.query(
    "UPDATE sach SET tensach = ?,gia_sach=?, hinhanh=?, mo_ta=?, so_luong=?, hinh_thuc_bia=?, trong_luong=?, so_trang=?, idtg=?,idnn=?,idkt=?,idncc=?,idtl=?,idnxb=? WHERE idsach=?",
    [
      sach.tensach,
      sach.gia_sach,
      sach.hinhanh,
      sach.mo_ta,
      sach.so_luong,
      sach.hinh_thuc_bia,
      sach.trong_luong,
      sach.so_trang,
      sach.idtg,
      sach.idnn,
      sach.idkt,
      sach.idncc,
      sach.idtl,
      sach.idnxb,
      idsach,
    ],
    (err, data) => {
      if (err) return rs(err, null);
      if (data.affectedRows === 0) return rs({ kind: "not_found" }, null);
      rs(null, data);
    }
  );
};

Sach.create = (newSach, rs) => {
  sql.query("INSERT INTO sach SET ?", [newSach], (err, _) => {
    if (err) return rs(err, null);
    rs(null, { ...newSach });
  });
};

Sach.getAll = (rs) => {
  sql.query(
    "SELECT s.idsach,s.gia_sach, s.tensach, s.hinhanh, s.mo_ta, s.so_luong, s.hinh_thuc_bia, s.trong_luong, s.so_trang, s.idtg, s.idnn, s.idnxb, s.idkt, s.idncc,s.idtl, t.hotentg, n.ngon_ngu, kt.kt_ngang, kt.kt_doc , nxb.tennxb, ncc.tenncc, tl.tentl FROM `sach` s, tac_gia t, ngon_ngu n, nha_xuat_ban nxb, nha_cung_cap ncc, sach_kich_thuoc kt, the_loai tl WHERE s.idtg = t.idtg AND s.idnn = n.idnn AND s.idnxb = nxb.idnxb AND kt.idkt = s.idkt AND ncc.idncc = s.idncc and s.idtl = tl.idtl",
    (err, data) => {
      if (err) return rs(err, null);
      rs(null, data);
    }
  );
};

Sach.getSachkm = (rs)=>{
    sql.query("SELECT idsach, tensach from sach WHERE idsach not in (SELECT idsach from khuyen_mai)",(err, data) => {
        if (err) return rs(err, null);
        rs(null, data);
    } )
}

Sach.getById = (idsach, rs) => {
  sql.query(
    "SELECT khuyen_mai.phan_tram, s.idsach,s.gia_sach, s.tensach, s.hinhanh, s.mo_ta, s.so_luong, s.hinh_thuc_bia, s.trong_luong, s.so_trang, s.idtg, s.idnn, s.idnxb, s.idkt, s.idncc,s.idtl, t.hotentg, n.ngon_ngu, kt.kt_ngang, kt.kt_doc , nxb.tennxb, ncc.tenncc, tl.tentl FROM `sach` s LEFT JOIN khuyen_mai on s.idsach = khuyen_mai.idsach, tac_gia t, ngon_ngu n, nha_xuat_ban nxb, nha_cung_cap ncc, sach_kich_thuoc kt, the_loai tl WHERE s.idtg = t.idtg AND s.idnn = n.idnn AND s.idnxb = nxb.idnxb AND kt.idkt = s.idkt AND ncc.idncc = s.idncc and s.idtl = tl.idtl AND s.idsach = ?",
    idsach,
    (err, data) => {
      if (err) return rs(err, null);
      rs(null, data[0]);
      console.log(data);
    }
  );
};

Sach.get = (rs) => {
  sql.query(
    "SELECT sach.idsach, sach.tensach, gia_sach, hinhanh, phan_tram FROM `sach` left JOIN khuyen_mai ON sach.idsach = khuyen_mai.idsach",
    (err, data) => {
      if (err) return rs(err, null);
      rs(null, data);
      console.log(data);
    }
  );
};

Sach.delete = (idsach, rs) => {
  sql.query("DELETE FROM sach WHERE idsach = ?", idsach, (err, data) => {
    if (err) return rs(err, null);
    if (data.affectedRows === 0) return rs({ kind: "not_found" }, null);
    rs(null, data);
  });
};

module.exports = Sach;
