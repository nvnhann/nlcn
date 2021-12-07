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
            if (data.affectedRows === 0) return rs({kind: "not_found"}, null);
            rs(null, data);
        }
    );
};

Sach.create = (newSach, rs) => {
    sql.query("INSERT INTO sach SET ?", [newSach], (err, _) => {
        if (err) return rs(err, null);
        rs(null, {...newSach});
    });
};

Sach.getAll = (rs) => {
    sql.query(
        "SELECT *, avg_rate(s.idsach) as danhgia  FROM `sach` s, tac_gia t, ngon_ngu n, nha_xuat_ban nxb, nha_cung_cap ncc, sach_kich_thuoc kt, the_loai tl WHERE s.idtg = t.idtg AND s.idnn = n.idnn AND s.idnxb = nxb.idnxb AND kt.idkt = s.idkt AND ncc.idncc = s.idncc and s.idtl = tl.idtl",
        (err, data) => {
            if (err) return rs(err, null);
            rs(null, data);
        }
    );
};

Sach.getSachkm = (rs) => {
    sql.query("SELECT idsach, tensach from sach WHERE idsach not in (SELECT idsach from khuyen_mai)", (err, data) => {
        if (err) return rs(err, null);
        rs(null, data);
    })
}

Sach.getById = (idsach, rs) => {
    sql.query(
        "SELECT avg_rate(s.idsach) as danhgia,khuyen_mai.phan_tram, s.*, t.hotentg, n.ngon_ngu, kt.kt_ngang, kt.kt_doc , nxb.tennxb, ncc.tenncc, tl.tentl FROM `sach` s LEFT JOIN khuyen_mai on s.idsach = khuyen_mai.idsach, tac_gia t, ngon_ngu n, nha_xuat_ban nxb, nha_cung_cap ncc, sach_kich_thuoc kt, the_loai tl WHERE s.idtg = t.idtg AND s.idnn = n.idnn AND s.idnxb = nxb.idnxb AND kt.idkt = s.idkt AND ncc.idncc = s.idncc and s.idtl = tl.idtl AND s.idsach = ?",
        idsach,
        (err, data) => {
            if (err) return rs(err, null);
            rs(null, data[0]);
            console.log(data);
        }
    );
};

Sach.get = (q, rs) => {
    const start = (q.page - 1) * 6;
    const end = q.page * 6;
    let qr = "";
    const idsach = q.idsach || '';
    if(q.search)
        qr = "SELECT avg_rate(sach.idsach) as danhgia, sach.idsach, sach.tensach, gia_sach, hinhanh, phan_tram,so_luong ,(SELECT COUNT(idsach) FROM sach, nha_cung_cap ncc, tac_gia tg, nha_xuat_ban nxb, the_loai tl, nhom_the_loai ntl WHERE sach.idtl = tl.idtl and tl.idntl = ntl.idntl and sach.idtg = tg.idtg and sach.idnxb = nxb.idnxb and sach.idncc = ncc.idncc and (sach.idsach  LIKE '%" + q.search + "%' OR tensach  LIKE '%" + q.search + "%' or gia_sach  LIKE '%" + q.search + "%' or so_luong  LIKE '%" + q.search + "%'  or phan_tram  LIKE '%" + q.search + "%' or tg.hotentg LIKE '%" + q.search + "%' or ncc.tenncc LIKE '%" + q.search + "%' or nxb.tennxb LIKE '%" + q.search + "%'  or tl.tentl  LIKE '%" + q.search + "%' or ntl.tenntl  LIKE '%" + q.search + "%')) AS so_luong_trang " +
            "FROM `sach` left JOIN khuyen_mai ON sach.idsach = khuyen_mai.idsach, tac_gia tg, nha_xuat_ban nxb, nha_cung_cap ncc, the_loai tl, nhom_the_loai ntl " +
            " WHERE sach.idtl = tl.idtl and tl.idntl = ntl.idntl and sach.idtg = tg.idtg and sach.idnxb = nxb.idnxb and sach.idncc = ncc.idncc and ( sach.idsach  LIKE '%" + q.search + "%' OR tensach  LIKE '%" + q.search + "%' or gia_sach  LIKE '%" + q.search + "%' or so_luong  LIKE '%" + q.search + "%'  or phan_tram  LIKE '%" + q.search + "%'  or tg.hotentg LIKE '%" + q.search + "%' or ncc.tenncc LIKE '%" + q.search + "%' or nxb.tennxb LIKE '%" + q.search + "%'  or tl.tentl  LIKE '%" + q.search + "%' or ntl.tenntl  LIKE '%" + q.search + "%') ";
    else qr = "SELECT avg_rate(sach.idsach) as danhgia, sach.idsach, sach.tensach, gia_sach, hinhanh, phan_tram,so_luong ,(SELECT COUNT(idsach) FROM sach) AS so_luong_trang " +
        "FROM `sach` left JOIN khuyen_mai ON sach.idsach = khuyen_mai.idsach, tac_gia tg WHERE tg.idtg = sach.idtg ";

    if(q.tensach) qr += "ORDER BY tensach "+q.tensach;
    else if(q.gia) qr += "ORDER BY gia_sach "+q.gia;
    else if(q.so_luong) qr += "ORDER BY so_luong "+q.so_luong;
    else if(q.khuyen_mai) qr += "ORDER BY phan_tram "+q.khuyen_mai;
    else if(q.sort === "moinhat") qr += "ORDER BY SUBSTRING(sach.idsach,6) * 1 DESC"
    else if(q.sort === "gia_giam") qr += "ORDER BY gia_sach DESC "
    else if(q.sort === "gia_tang") qr += "ORDER BY gia_sach ASC "
    else if(q.sort === "khuyenmai") qr += "AND phan_tram IS NOT NULL ";
    else qr += "ORDER BY SUBSTRING(sach.idsach,6) * 1 "+ idsach;
   if(q.page){
       qr += " LIMIT " + start + "," + end + "";
   }
    console.log(qr)
    sql.query(qr, (err, data) => {
            if (err) return rs(err, null);
            rs(null, data);
        }
    );
};

Sach.delete = (idsach, rs) => {
    sql.query("DELETE FROM sach WHERE idsach = ?", idsach, (err, data) => {
        if (err) return rs(err, null);
        if (data.affectedRows === 0) return rs({kind: "not_found"}, null);
        rs(null, data);
    });
};

Sach.getExcel = (rs)=>{
    const qr = "SELECT s.idsach as \"ID sách\", s.tensach as \"Tên sách\", s.gia_sach as \"Giá sách ($)\", s.so_luong as \"Số  lượng\", s.so_trang AS \"Số trang\", s.hinh_thuc_bia as \"Hình thức bìa\", s.trong_luong as \"Trọng lượng\", t.hotentg AS \"Tác giả\", ncc.tenncc as \"Nhà cung cấp\", nxb.tennxb AS \"Nhà xuất bản\", tl.tentl as \"Thể loại\",CONCAT(kt.kt_ngang,' x ', kt.kt_doc, 'cm') as \"Kích thước\", CONCAT(km.phan_tram, '%') AS \"Khuyến mãi\", km.ngay_bd_km as \"Ngày bắt đầu KM\", km.ngay_het_km as \"Ngày hết KM\" FROM `sach` s LEFT JOIN khuyen_mai km on s.idsach = km.idsach, tac_gia t, ngon_ngu n, nha_xuat_ban nxb, nha_cung_cap ncc, sach_kich_thuoc kt, the_loai tl WHERE s.idtg = t.idtg  AND s.idnn = n.idnn AND s.idnxb = nxb.idnxb AND kt.idkt = s.idkt AND ncc.idncc = s.idncc and s.idtl = tl.idtl;"
    sql.query(qr, (err, data)=>{
        if (err) return rs(err, null);
        rs(null, data);
    });
}

module.exports = Sach;
