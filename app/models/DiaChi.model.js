const sql = require('./db');
const DiaChi = function (diachi) {
  this.diachi = diachi.diachi;
  this.macdinh = diachi.macdinh;
  this.idtk = diachi.idtk;
};

DiaChi.create = (newDiachi, rs) => {
  const d = new Date();
  const iddc = 'dc' + d.getTime();
  if (newDiachi.macdinh === 1) {
    sql.query(
      'INSERT INTO `dia_chi` (`iddc`,`diachi`, `mac_dinh`, `idtk`) VALUES (?,?,?,?)',
      [iddc, newDiachi.diachi, newDiachi.macdinh, newDiachi.idtk],
      (err, _) => {
        if (err) return rs(err, null);
        else {
          sql.query('UPDATE `dia_chi` SET mac_dinh = ? where iddc <> ?', [0, iddc], (err, data) => {
            if (err) return rs(err, null);
            return rs(null, data);
          });
        }
      }
    );
  } else {
    sql.query(
      'INSERT INTO `dia_chi` (`iddc`,`diachi`, `mac_dinh`, `idtk`) VALUES (?,?,?,?)',
      [iddc, newDiachi.diachi, newDiachi.macdinh, newDiachi.idtk],
      (err, data) => {
        if (err) return rs(err, null);
        return rs(null, data);
      }
    );
  }
};

DiaChi.getAll = (rs) => {
  sql.query('SELECT * FROM `dia_chi` ', (err, data) => {
    if (err) return rs(err, null);
    rs(null, data);
  });
};

DiaChi.delete = (iddc, idtk, rs) => {
  sql.query('DELETE FROM `dia_chi` WHERE iddc = ? AND idtk = ?', [iddc, idtk], (err, data) => {
    if (err) return rs(err, null);
    if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
    rs(null, data);
  });
};
DiaChi.update = (iddc, newDiachi, rs) => {
  if (newDiachi.macdinh === 1) {
    sql.query(
      'UPDATE `dia_chi` SET `diachi` = ?, `mac_dinh` = ? WHERE `dia_chi`.`iddc` = ? AND `dia_chi`.`idtk` = ? ',
      [newDiachi.diachi, newDiachi.macdinh, iddc, newDiachi.idtk],
      (err, data) => {
        if (err) return rs(err, null);
        else if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
        else {
          sql.query('UPDATE `dia_chi` SET mac_dinh = ? where iddc <> ?', [0, iddc], (err, data) => {
            if (err) return rs(err, null);
            return rs(null, data);
          });
        }
      }
    );
  } else {
    sql.query(
      'UPDATE `dia_chi` SET `diachi` = ?, `mac_dinh` = ? WHERE `dia_chi`.`iddc` = ? AND `dia_chi`.`idtk` = ? ',
      [newDiachi.diachi, newDiachi.macdinh, iddc, newDiachi.idtk],
      (err, data) => {
        if (err) return rs(err, null);
        return rs(null, data);
      }
    );
  }
};

module.exports = DiaChi;
