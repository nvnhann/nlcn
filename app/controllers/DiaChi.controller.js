const DiaChi = require('../models/DiaChi.model');

exports.create = (req, res) => {
  const diachi = new DiaChi({
    diachi: req.body.diachi,
    macdinh: req.body.macdinh,
    idtk: req.body.idtk,
  });

  DiaChi.create(diachi, (err, _) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send({ message: 'Thanh cong!' });
  });
};

exports.getAll = (req, res) => {
  DiaChi.getAll((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};

exports.delete = (req, res) => {
  const iddc = req.params.iddc;
  const idtk = req.body.idtk;

  DiaChi.delete(iddc, idtk, (err, _) => {
    if (err) {
      if (err.kind === 'not_found') return res.status(404).send({ message: 'Not found dia chi with id ' + iddc });
      else return res.status(500).send({ message: 'Could not delete dia chi with id ' } + iddc);
    }
    res.send({ message: 'dia chi was deleted with id' + iddc });
  });
};

exports.update = (req, res) => {
  const iddc = req.params.iddc;
  const diachi = new DiaChi({
    diachi: req.body.diachi,
    macdinh: req.body.macdinh,
    idtk: req.body.idtk,
  });
  DiaChi.update(iddc, diachi, (err, _) => {
    if (err) {
      if (err.kind === 'not_found') return res.status(404).send({ message: 'not found dia chi with id ' + iddc });
      else return res.status(500).send({ message: 'could not update dia chi with id' + iddc });
    }
    res.send({ message: 'dia chi was updated successfully!' });
  });
};
