const HoaDon = require('../models/HoaDon.model');
const CTHD = require('../models/ChiTietHoaDon.model');

exports.create = (req, res)=>{
    const hoadon = new HoaDon({
        email_paypal: req.body.emailPayPal,
        tong_gia: req.body.tong_gia,
        idtk: req.body.idtk,
        iddc: req.body.iddc,
        trang_thai: 0
    });

    HoaDon.create(hoadon, (err, _)=>{
        if(err) {
            console.log(err);
            return res.status(500).send({message: err})
        }
        else{
            let check = true;
            HoaDon.getIdDesc((_, idhd)=>{
                req.body.sach.map((value, index)=>{
                    const cthd = new CTHD({
                        idhd: idhd.idhd,
                        idsach: value.idsach,
                        so_luong: value.so_luong,
                        gia: value.gia_sach,
                        phan_tram: value.phan_tram ? value.phan_tram : 0
                    });

                    CTHD.create(cthd, (err, _)=>{
                        if(err){
                            console.log(err)
                            return check = false;
                        }
                    })

                });

            });


            if(check){
              return res.status(200).send({ message: `thanh cong` });

            }else{
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the user."
                });
            }
        }
    })
}

exports.getById = (req, res) =>{
    HoaDon.getById(req.idtk, (err, hd)=>{
        if(err) {
            console.log(err);
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        }else {
            CTHD.getById(req.idtk, (err, cthd)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send({
                        message: err.message || "Some error occurred while retrieving customers."
                    });
                }
                else {
                    res.send({hd: hd, cthd: cthd})
                }
            })
        }
    })
}

exports.getAll = (req, res) =>{
    HoaDon.getAll(req.query,(err, hd)=>{
        if(err) {
            console.log(err);
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        }else {
            CTHD.getAll((err, cthd)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send({
                        message: err.message || "Some error occurred while retrieving customers."
                    });
                }
                else {
                    res.send({hd: hd, cthd: cthd})
                }
            })
        }
    })
}

exports.huydon = (req, res) =>{
    const idhd = req.params.idhd;
    HoaDon.huy(idhd, (err, _)=>{
        if (err){
            console.log(err)
            if(err.kind === 'not_found'){
                return res.status(404).send({message: 'not found idhd with id= '+idhd})
            } else return  res.status(500).send({message: 'cant not cancle order!!'});
        }
       else return res.send({message: 'cancle order successfully!!'})
    })
}

exports.XacNhan = (req, res) =>{
    const idhd = req.params.idhd;
    HoaDon.XacNhan(idhd, (err, _)=>{
        if (err){
            console.log(err)
            if(err.kind === 'not_found'){
                return res.status(404).send({message: 'not found idhd with id= '+idhd})
            } else return  res.status(500).send({message: 'cant not conform order!!'});
        }
        else return res.send({message: 'conform order successfully!!'})
    })
}

exports.XacNhanHuy = (req, res) =>{
    const idhd = req.params.idhd;
    HoaDon.XacNhanHuy(idhd, (err, _)=>{
        if (err){
            console.log(err)
            if(err.kind === 'not_found'){
                return res.status(404).send({message: 'not found idhd with id= '+idhd})
            } else return  res.status(500).send({message: 'cant not cancle order!!'});
        }
        else return res.send({message: 'conform cancle order successfully!!'})
    })
}