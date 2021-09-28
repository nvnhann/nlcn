const sql = require('./db');

const NhomTheLoai = function (nhomtheloai) {
  this.tenntl = nhomtheloai.tenntl;
};

NhomTheLoai.create = (newNhomTheLoai, rs) => {
  sql.query('INSERT INTO `nhom_the_loai` ( `tenntl`) VALUES ( ?)', [newNhomTheLoai.tenntl], (err, _) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    rs(null, { ...newNhomTheLoai });
  });
};
NhomTheLoai.getAll = (rs) => {
  sql.query('SELECT * FROM `nhom_the_loai`', (err, data) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    rs(null, data);
  });
};
NhomTheLoai.delete = (idntl, rs) => {
  sql.query('DELETE FROM `nhom_the_loai` WHERE `nhom_the_loai`.`idntl` = ?', idntl, (err, data) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    if (data.affectedRows === 0) return rs({ kind: 'not_found' });
    rs(null, data);
  });
};
NhomTheLoai.update = (idntl, newNhomTheLoai, rs) => {
  sql.query(
    'UPDATE `nhom_the_loai` SET `tenntl` = ? WHERE `nhom_the_loai`.`idntl` = ?',
    [newNhomTheLoai.tenntl, idntl],
    (err, data) => {
      if (err) {
        console.log(err);
        return rs(err, null);
      }
      if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
      rs(null, data);
    }
  );
};

module.exports = NhomTheLoai;
