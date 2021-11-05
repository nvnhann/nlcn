const NgonNgu = require("../models/NgonNgu.model");

exports.create = (req, res) => {
  const ngonngu = new NgonNgu({
    ngon_ngu: req.body.ngonngu,
  });

  NgonNgu.create(ngonngu, (err, _) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send({ message: "Thanh cong" });
  });
};
exports.getAll = (req, res) => {
  NgonNgu.getAll((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};
exports.delete = (req, res) => {
  const idnn = req.params.idnn;
  NgonNgu.delete(idnn, (err, _) => {
    if (err) {
      if (err.kind === "not_found")
        return res
          .status(404)
          .send({ message: "Not found ngon ngu with id" + idnn });
      else
        return res
          .status(500)
          .send({ message: "Could not delete ngon ngu with id " + idnn });
    }
    res.send({ message: "NgonNgu was deleted successfully!" });
  });
};
exports.update = (req, res) => {
  const ngonngu = new NgonNgu({
    ngon_ngu: req.body.ngonngu,
  });
  const idnn = req.params.idnn;
  NgonNgu.update(idnn, ngonngu, (err, _) => {
    if (err) {
      if (err.kind === "not_found")
        return res
          .status(404)
          .send({ message: "Not found ngon ngu with id " + idnn });
      else
        return res
          .status(500)
          .send({ message: "could not update ngon ngu with id " + idnn });
    }
    res.send({ message: "Ngon ngu was updated successfully!" });
  });
};
