const sql = require('./db');

const TacGia = function (tacgia) {
  this.hotentg = tacgia.hotentg;
  this.diachi = tacgia.diachi;
};

TacGia.create = (newTacgia, rs) => {
  sql.query(
    'INSERT INTO `tac_gia` (`hotentg`, `dia_chi`) VALUES (?, ?)',
    [newTacgia.hotentg, newTacgia.diachi],
    (err, _) => {
      if (err) {
        console.log(err);
        return rs(err, null);
      }
      rs(null, { ...newTacgia });
    }
  );
};

TacGia.getAll = (rs) => {
  sql.query('SELECT * FROM tac_gia;', (err, data) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    rs(null, data);
  });
};

TacGia.delete = (idtg, rs) => {
  sql.query('DELETE FROM `tac_gia` WHERE `tac_gia`.`idtg` = ?', idtg, (err, data) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
    rs(null, data);
  });
};

TacGia.update = (idtg, newTacgia, rs) => {
  sql.query(
    'UPDATE `tac_gia` SET `hotentg` = ?, `dia_chi` = ? WHERE `tac_gia`.`idtg` = ?',
    [newTacgia.hotentg, newTacgia.diachi, idtg],
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

module.exports = TacGia;
