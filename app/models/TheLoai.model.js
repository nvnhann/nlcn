const sql = require("./db");

const TheLoai = function (theloai) {
  this.tentl = theloai.tentl;
  this.idntl = theloai.idntl;
};

TheLoai.create = (newTheLoai, rs) => {
  sql.query(
    "INSERT INTO `the_loai` ( `tentl`, `idntl`) VALUES ( ?,?)",
    [newTheLoai.tentl, newTheLoai.idntl],
    (err, _) => {
      if (err) return rs(err, null);
      rs(null, { ...newTheLoai });
    }
  );
};
TheLoai.getAll = (rs) => {
  sql.query(
    "SELECT tl.idtl, tl.tentl, ntl.idntl, ntl.tenntl FROM `the_loai` tl, nhom_the_loai ntl WHERE tl.idntl = ntl.idntl",
    (err, data) => {
      if (err) return rs(err, null);
      rs(null, data);
    }
  );
};
TheLoai.delete = (idtl, rs) => {
  sql.query(
    "DELETE FROM `the_loai` WHERE `the_loai`.`idtl` = ?",
    idtl,
    (err, data) => {
      if (err) return rs(err, null);
      if (data.affectedRows === 0) return rs({ kind: "not_found" }, null);
      rs(null, data);
    }
  );
};

TheLoai.update = (idtl, newTheLoai, rs) => {
  sql.query(
    "UPDATE `the_loai` SET `tentl` = ?, `idntl`=? WHERE `the_loai`.`idtl` = ? ",
    [newTheLoai.tentl, newTheLoai.idntl, idtl],
    (err, data) => {
      if (err) return rs(err, null);
      if (data.affectedRows === 0) return rs({ kind: "not_found" }, null);
      rs(null, data);
    }
  );
};

module.exports = TheLoai;
