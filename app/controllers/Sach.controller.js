const Sach = require("../models/Sach.model");

exports.create = (req, res) => {
  const data = JSON.parse(req.body.data);
  const file = req.file;
  const name = file?.destination + "/" + file?.filename;
  const filename = name.replace("./frontend/public/", "/");
  const sach = new Sach({
    tensach: data.tensach,
    gia_sach: data.gia_sach,
    hinhanh: !!filename ? filename : "",
    mo_ta: data.mo_ta,
    so_luong: data.so_luong,
    hinh_thuc_bia: data.hinh_thuc_bia,
    trong_luong: data.trong_luong,
    so_trang: data.so_trang,
    idtg: data.idtg,
    idnn: data.idnn,
    idkt: data.idkt,
    idncc: data.idncc,
    idtl: data.idtl,
    idnxb: data.idnxb,
  });
  Sach.create(sach, (err, _) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send({ message: "Thanh_cong" });
  });
};

exports.getAll = (req, res) => {
  Sach.getAll((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};

exports.getById = (req, res) => {
  Sach.getById(req.params.idsach, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};

exports.get = (req, res) => {
  Sach.get((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};

exports.getSachkm = (req, res) => {
  Sach.getSachkm((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err});
    }
    res.send(data);
  });
};

exports.update = (req, res) => {
  const data = JSON.parse(req.body.data);
  const file = req.file;
  const name = file?.destination + "/" + file?.filename;
  const filename = name?.replace("./frontend/public/", "/");
  const idsach = req.params.idsach;
  const sach = new Sach({
    idsach: idsach,
    tensach: data.tensach,
    gia_sach: data.gia_sach,
    hinhanh: !!file ? filename : data.hinh_anh,
    mo_ta: data.mo_ta,
    so_luong: data.so_luong,
    hinh_thuc_bia: data.hinh_thuc_bia,
    trong_luong: data.trong_luong,
    so_trang: data.so_trang,
    idtg: data.idtg,
    idnn: data.idnn,
    idkt: data.idkt,
    idncc: data.idncc,
    idtl: data.idtl,
    idnxb: data.idnxb,
  });

  Sach.update(idsach, sach, (err, _) => {
    if (err) {
      if (err.kind === "not_found")
        return res
          .status(404)
          .send({ message: "Not found sach with id" + idsach });
      else
        return res.status(500).send({
          message: "Could not update sach with id " + idsach,
        });
    }
    res.send({ message: "sach was updated successfully!" });
  });
};

exports.delete = (req, res) => {
  Sach.delete(req.params.idsach, (err, _) => {
    if (err) {
      if (err.kind === "not_found")
        return res
          .status(404)
          .send({ message: "Not found sach with id" + idsach });
      else
        return res.status(500).send({
          message: "Could not delete sach with id " + idsach,
        });
    }
    res.send({ message: "sach was deleted successfully!" });
  });
};
