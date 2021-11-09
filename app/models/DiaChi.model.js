const sql = require('./db');
const DiaChi = function (diachi) {
  this.diachi = diachi.diachi;
  this.mac_dinh = diachi.mac_dinh;
  this.ho = diachi.ho;
  this.sdt= diachi.sdt;
  this.ten= diachi.ten;
  this.idtk = diachi.idtk;
};

DiaChi.create = (newDiachi,rs) => {
  if (newDiachi.mac_dinh === 1) {
    sql.query(
      'INSERT INTO `dia_chi` SET ?',
      newDiachi,
      (err, _) => {
        if (err) return rs(err, null);
        else {
          sql.query('SELECT @iddc := iddc FROM dia_chi WHERE idtk = ? ORDER BY iddc DESC LIMIT 1 ;UPDATE `dia_chi` SET mac_dinh = 0 where iddc <> @iddc;', [newDiachi.idtk], (err, data) => {
            if (err) return rs(err, null);
            return rs(null, data);
          });
        }
      }
    );
  } else {
    sql.query(
        'INSERT INTO `dia_chi` SET ?',
       newDiachi,
      (err, data) => {
        if (err) return rs(err, null);
        return rs(null, data);
      }
    );
  }
};

DiaChi.getAll = (idtk,rs) => {
  sql.query('SELECT * FROM `dia_chi` where idtk = ? ORDER BY mac_dinh DESC',idtk, (err, data) => {
    if (err) return rs(err, null);
    rs(null, data);
  });
};

DiaChi.delete = (iddc, rs) => {
  sql.query('DELETE FROM `dia_chi` WHERE iddc = ?  ', [iddc], (err, data) => {
    if (err) return rs(err, null);
    if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
    rs(null, data);
  });
};
DiaChi.update = (iddc, newDiachi, rs) => {
  if (newDiachi.mac_dinh === 1) {
    sql.query(
      'UPDATE `dia_chi` SET ? WHERE `dia_chi`.`iddc` = ?',
      [newDiachi, iddc],
      (err, data) => {
        if (err) return rs(err, null);
        else if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
        else {
          sql.query('UPDATE `dia_chi` SET mac_dinh = 0 where iddc <> ?;', [iddc] ,(err, data) => {
            if (err) return rs(err, null);
            return rs(null, data);
          });
        }
      }
    );
  } else {
    sql.query(
      'UPDATE `dia_chi` SET ? WHERE `dia_chi`.`iddc` = ? ',
      [newDiachi, iddc],
      (err, data) => {
        if (err) return rs(err, null);
        return rs(null, data);
      }
    );
  }
};

module.exports = DiaChi;
