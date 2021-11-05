const sql = require('./db');

const NhaXuatBan = function (nhaxuatban) {
  this.tennxb = nhaxuatban.tennxb;
  this.dia_chi = nhaxuatban.dia_chi;
};

NhaXuatBan.create = (newNhaXuatBan, rs) => {
  sql.query(
    'INSERT INTO nha_xuat_ban SET ?',
    newNhaXuatBan,
    (err, _) => {
      if (err) {
        console.log(err);
        return rs(err, null);
      }
      rs(null, { ...newNhaXuatBan });
    }
  );
};

NhaXuatBan.getAll = (rs) => {
  sql.query('SELECT * FROM nha_xuat_ban', (err, data) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    rs(null, data);
  });
};

NhaXuatBan.delete = (idnxb, rs) => {
  sql.query('DELETE FROM `nha_xuat_ban` WHERE `nha_xuat_ban`.`idnxb` = ?', idnxb, (err, data) => {
    if (err) {
      console.log('error: ', err);
      return rs(err, null);
    }

    if (data.affectedRows === 0) {
      // not found nxb with the id
      return rs({ kind: 'not_found' }, null);
    }
    console.log('deleted nxb with id: ', idnxb);
    rs(null, data);
  });
};

NhaXuatBan.update = (idnxb, newNhaxuatban, rs) => {
  sql.query(
    'UPDATE `nha_xuat_ban` SET ? WHERE `nha_xuat_ban`.`idnxb` = ?',
    [newNhaxuatban, idnxb],
    (err, data) => {
      if (err) {
        console.log('error: ', err);
        return rs(err, null);
      }

      if (data.affectedRows === 0) {
        // not found nxb with the id
        return rs({ kind: 'not_found' }, null);
      }
      console.log('update nxb with id: ', idnxb);
      rs(null, data);
    }
  );
};
module.exports = NhaXuatBan;
