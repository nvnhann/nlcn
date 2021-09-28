const KichThuoc = require('../models/KichThuot.model');

exports.create = (req, res) => {
  const kichthuot = new KichThuoc({
    ngang: req.body.ngang,
    doc: req.body.doc,
  });

  KichThuoc.create(kichthuot, (err, _) => {
    if (err) {
      console.log(err.errno);
      if (err.errno === 1062) return res.status(500).send({ message: 'Kich thuoc da ton tai' });
      else return res.status(500).send({ message: err });
    }
    res.send({ message: 'Thanh cong' });
  });
};
exports.getAll = (req, res) => {
  KichThuoc.getAll((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send({ data });
  });
};
exports.delete = (req, res) => {
  const idkt = req.params.idkt;
  KichThuoc.delete(idkt, (err, _) => {
    if (err) {
      if (err.kind === 'not_found') return res.status(404).send({ message: 'not found kich thuoc with id ' + idkt });
      else return res.status(500).send({ message: 'could not delete kich thuot with id ' + idkt });
    }
    res.send({ message: 'Kich thuot was deleted successfully!' });
  });
};
exports.update = (req, res) => {
  const kichthuot = new KichThuoc({
    ngang: req.body.ngang,
    doc: req.body.doc,
  });
  const idkt = req.params.idkt;
  KichThuoc.update(idkt, kichthuot, (err, _) => {
    if (err) {
      if (err.kind === 'not_found') return res.status(404).send({ message: 'not found kich thuot with id' + idkt });
      else if (err.errno === 1062) return res.status(500).send({ message: 'Kich thuoc da ton tai' });
      else return res.status(500).send({ message: 'Could not update kich thuot with id ' + idkt });
    }
    res.send({ message: 'Kich thuot was updated successfully!' });
  });
};
