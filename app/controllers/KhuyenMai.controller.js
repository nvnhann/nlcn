const KhuyenMai = require('../models/KhuyenMai.model');

exports.create = (req, res)=>{
    const d = new Date();
    const idkm = 'km'+d.getTime();
    const khuyenmai = new KhuyenMai({
        idkm: idkm,
        phan_tram: req.body.phan_tram,
        ngay_het_km : req.body.ngay_het_km,
        ngay_bd_km: req.body.ngay_bd_km,
        idsach: req.body.idsach
    });

    KhuyenMai.create(khuyenmai, (err, _)=>{
        if(err){
            console.log(err);
            return res.status(500).send({message: err});
        }
        return res.send({message: 'thanh_cong'})
    })
}

exports.get = (req, res)=>{
    KhuyenMai.getAll((err, data)=>{
        if (err) return res.status(500).send({message: err});
        return res.send(data);
    })
}

exports.update = (req, res)=>{
    const idkm = req.params.idkm;
    const khuyenmai = new KhuyenMai({
        phan_tram: req.body.phan_tram,
        ngay_bd_km: req.body.ngay_bd_km,
        ngay_het_km : req.body.ngay_het_km,
        idsach: req.body.idsach
    });
    KhuyenMai.update(idkm, khuyenmai, (err, _)=>{
        if(err){
            if (err.kind === "not_found")
                return res
                    .status(404)
                    .send({ message: `not found khuyen mai with id ${idkm}.` });
            else
                return res.status(500).send({
                    message: `could not update khuyen mai with id ${idkm}`,
                });
        }
        return res.send({ message: "khuyen mai was not updated successfully!" })
    })
}

exports.delete = (req, res)=>{
    const idkm = req.params.idkm;
    KhuyenMai.delete(idkm, (err, _)=>{
        if(err){
            if (err.kind === "not_found")
                return res
                    .status(404)
                    .send({ message: `not found khuyen mai with id ${idkm}.` });
            else
                return res.status(500).send({
                    message: `could not delete khuyen mai with id ${idkm}`,
                });
        }
        return res.send({ message: "khuyen mai was deleted successfully!" })
    })
}