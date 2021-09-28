const sql = require('./db');

const TheLoai = function (theloai) {
  this.tentl = theloai.tentl;
  this.idntl = theloai.idntl;
};

TheLoai.create = (newTheLoai, rs) => {
  sql.query(
    'INSERT INTO `the_loai` ( `tentl`, `idntl`) VALUES ( ?,?)',
    [newTheLoai.tentl, newTheLoai.idntl],
    (err, _) => {
      if (err) return rs(err, null);
      rs(null, { ...newTheLoai });
    }
  );
};
TheLoai.getAll = (rs) => {
  sql.query('SELECT * FROM`the_loai`', (err, data) => {
    if (err) return rs(err, null);
    rs(null, data);
  });
};
TheLoai.delete = (idtl, idntl, rs) => {
  sql.query(
    'DELETE FROM `the_loai` WHERE `the_loai`.`idtl` = ? AND `the_loai`.`idntl` = ?',
    [idtl, idntl],
    (err, data) => {
      if (err) return rs(err, null);
      if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
      rs(null, data);
    }
  );
};
TheLoai.update = (idtl, idntl, newTheLoai, rs) => {
  sql.query(
    'UPDATE `the_loai` SET `tentl` = ? WHERE `the_loai`.`idtl` = ? AND `the_loai`.`idntl` = ?',
    [newTheLoai.tentl, idtl, idntl],
    (err, data) => {
      if (err) return rs(err, null);
      if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
      rs(null, data);
    }
  );
};

module.exports = TheLoai;
