const sql = require('./db');

const NgonNgu = function (ngonngu) {
  this.ngonngu = ngonngu.ngonngu;
};

NgonNgu.create = (newNgonNgu, rs) => {
  sql.query('INSERT INTO `ngon_ngu` (`ngon_ngu`) VALUES (?)', [newNgonNgu.ngonngu], (err, _) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    rs(null, { ...newNgonNgu });
  });
};
NgonNgu.getAll = (rs) => {
  sql.query('SELECT * FROM `ngon_ngu`', (err, data) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    rs(null, data);
  });
};
NgonNgu.delete = (idnn, rs) => {
  sql.query('DELETE FROM `ngon_ngu` WHERE `ngon_ngu`.`idnn` = ?', idnn, (err, data) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
    rs(null, data);
  });
};
NgonNgu.update = (idnn, newNgonNgu, rs) => {
  sql.query(
    'UPDATE `ngon_ngu` SET `ngon_ngu` = ? WHERE `ngon_ngu`.`idnn` = ?',
    [newNgonNgu.ngonngu, idnn],
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
module.exports = NgonNgu;
