const TheLoai = require("../models/TheLoai.model");

exports.create = (req, res) => {
  const theloai = new TheLoai({
    tentl: req.body.tentl,
    idntl: req.body.idntl,
  });

  TheLoai.create(theloai, (err, _) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send({ message: "Thanh conng" });
  });
};
exports.getAll = (req, res) => {
  TheLoai.getAll((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};
exports.delete = (req, res) => {
  const idtl = req.params.idtl;
  TheLoai.delete(idtl, (err, _) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).send({
          message: "not found the loai with id " + idtl + "idntl: " + idntl,
        });
      else
        return res
          .status(500)
          .send({ message: "could not delete the loai with id " + idtl });
    }
    res.send({ message: "The Loai was deleted with id " + idtl });
  });
};
exports.update = (req, res) => {
  const idtl = req.params.idtl;
  const idntl = req.body.idntl;
  const theloai = new TheLoai({
    tentl: req.body.tentl,
    idntl: idntl,
  });

  TheLoai.update(idtl, theloai, (err, _) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).send({
          message: "not found the loai with id " + idtl + "idntl" + idntl,
        });
      else
        return res
          .status(500)
          .send({ message: "could not update the loai with id " + idtl });
    }
    res.send({ message: "The Loai was updated with id " + idtl });
  });
};
