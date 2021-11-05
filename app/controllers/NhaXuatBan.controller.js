const NhaXuatBan = require("../models/NhaXuatBan.model");

exports.create = (req, res) => {
  const nhaxuatban = new NhaXuatBan({
    tennxb: req.body.tennxb,
    dia_chi: req.body.diachi,
  });

  NhaXuatBan.create(nhaxuatban, (err, data) => {
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
  NhaXuatBan.getAll((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};

exports.delete = (req, res) => {
  NhaXuatBan.delete(req.params.idnxb, (err, _) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found nxb with id ${req.params.idnxb}.`,
        });
      } else {
        return res.status(500).send({
          message: "Could not delete nxb with id " + req.params.idnxb,
        });
      }
    }
    res.send({ message: `nxb was deleted successfully!` });
  });
};

exports.update = (req, res) => {
  const nhaxuatban = new NhaXuatBan({
    tennxb: req.body.tennxb,
    dia_chi: req.body.diachi,
  });

  NhaXuatBan.update(req.params.idnxb, nhaxuatban, (err, _) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found nxb with id ${req.params.idnxb}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not update nxb with id " + req.params.idnxb,
        });
      }
    } else res.send({ message: `nxb was update successfully!` });
  });
};
