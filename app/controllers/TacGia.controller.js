const TacGia = require("../models/TacGia.model");

exports.create = (req, res) => {
  const tacgia = new TacGia({
    hotentg: req.body.hotentg,
    dia_chi: req.body.diachi,
  });

  TacGia.create(tacgia, (err, _) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send({ message: "Thành công" });
  });
};

exports.getAll = (req, res) => {
  TacGia.getAll((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};

exports.delete = (req, res) => {
  TacGia.delete(req.params.idtg, (err, _) => {
    if (err) {
      if (err.kind === "not_found")
        return res
          .status(404)
          .send({ message: `not found tacgia with id ${req.params.idtg}.` });
      else
        return res.status(500).send({
          message: `could not delete tac gia with id ${req.params.idtg}`,
        });
    }
    res.send({ message: "tacgia was not deleted successfully!" });
  });
};

exports.update = (req, res) => {
  const tacgia = new TacGia({
    hotentg: req.body.hotentg,
    dia_chi: req.body.diachi,
  });
  TacGia.update(req.params.idtg, tacgia, (err, _) => {
    if (err) {
      if (err.kind === "not_found")
        return res
          .status(404)
          .send({ message: "Not found tacgia with id" + req.params.idtg });
      else
        return res.status(500).send({
          message: "Could not update tacgia with id " + req.params.idtg,
        });
    }
    res.send({ message: "tacgia was updated successfully!" });
  });
};
