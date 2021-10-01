const NhaCungCap = require("../models/NhaCungCap.model");

exports.create = (req, res) => {
  const nhacungcap = new NhaCungCap({
    tenncc: req.body.tenncc,
    diachi: req.body.diachi,
  });

  NhaCungCap.create(nhacungcap, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send({
      message: "Thành công",
    });
  });
};

exports.getAll = (req, res) => {
  NhaCungCap.getAll((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};

exports.delete = (req, res) => {
  NhaCungCap.delete(req.params.idncc, (err, _) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found ncc with id ${req.params.idncc}.`,
        });
      } else {
        return res.status(500).send({
          message: "Could not delete ncc with id " + req.params.idncc,
        });
      }
    }
    res.send({ message: `ncc was deleted successfully!` });
  });
};

exports.update = (req, res) => {
  const nhacungcap = new NhaCungCap({
    tenncc: req.body.tenncc,
    diachi: req.body.diachi,
  });
  NhaCungCap.update(req.params.idncc, nhacungcap, (err, _) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found ncc with id ${req.params.idncc}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not update ncc with id " + req.params.idncc,
        });
      }
    } else res.send({ message: `ncc was update successfully!` });
  });
};
