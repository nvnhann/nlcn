const sql = require('./db');

const KichThuoc = function (kichthuoc) {
  this.ngang = kichthuoc.ngang;
  this.doc = kichthuoc.doc;
};

KichThuoc.create = (newKichThuoc, rs) => {
  sql.query(
    'INSERT INTO `sach_kich_thuoc` (`kt_ngang`, `kt_doc`) VALUES (?, ?)',
    [newKichThuoc.ngang, newKichThuoc.doc],
    (err, _) => {
      if (err) {
        console.log(err);
        return rs(err, null);
      }
      rs(null, { ...newKichThuoc });
    }
  );
};
KichThuoc.getAll = (rs) => {
  sql.query('SELECT * FROM `sach_kich_thuoc`', (err, data) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    rs(null, data);
  });
};
KichThuoc.delete = (idkt, rs) => {
  sql.query('DELETE FROM `sach_kich_thuoc` WHERE `sach_kich_thuoc`.`idkt` = ?', idkt, (err, data) => {
    if (err) {
      console.log(err);
      return rs(err, null);
    }
    if (data.affectedRows === 0) return rs({ kind: 'not_found' }, null);
    rs(null, data);
  });
};
KichThuoc.update = (idkt, newKichThuoc, rs) => {
  sql.query(
    'UPDATE `sach_kich_thuoc` SET `kt_ngang` = ?, `kt_doc` = ? WHERE `sach_kich_thuoc`.`idkt` = ?',
    [newKichThuoc.ngang, newKichThuoc.doc, idkt],
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

module.exports = KichThuoc;
