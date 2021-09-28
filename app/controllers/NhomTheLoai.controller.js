const NhomTheLoai = require('../models/NhomTheLoai.model');

exports.create = (req, res) => {
  const nhomtheloai = new NhomTheLoai({
    tenntl: req.body.tenntl,
  });
  NhomTheLoai.create(nhomtheloai, (err, _) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send({ message: 'Thanh cong' });
  });
};
exports.getAll = (req, res) => {
  NhomTheLoai.getAll((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};
exports.delete = (req, res) => {
  const idntl = req.params.idntl;
  NhomTheLoai.delete(idntl, (err, _) => {
    if (err) {
      if (err.kind === 'not_found') return res.status(404).send({ message: 'not found nhom the loai with id' + idntl });
      else return res.status(500).send({ message: 'Could not delete nhom the loai with id ' + idntl });
    }
    res.send({ message: 'Nhom the loai was deleted successfully!' });
  });
};
exports.update = (req, res) => {
  const nhomtheloai = new NhomTheLoai({
    tenntl: req.body.tenntl,
  });
  const idntl = req.params.idntl;
  NhomTheLoai.update(idntl, nhomtheloai, (err, _) => {
    if (err) {
      if (err.kind === 'not_found') return res.status(404).send({ message: 'not found nhom the loai with id' + idntl });
      else return res.status(500).send({ message: 'Could not update nhom the loai with id ' + idntl });
    }
    res.send({ message: 'Nhom the loai was updated successfully!' });
  });
};
