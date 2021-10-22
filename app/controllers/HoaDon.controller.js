const HoaDon = require('../models/HoaDon.model');
const CTHD = require('../models/ChiTietHoaDon.model');

exports.create = (req, res)=>{
    const d = new Date();
    const idhd = 'HD'+d.getTime();
    const hoadon = new HoaDon({
        idhd: idhd,
        email_paypal: req.body.emailPayPal,
        tong_gia: req.body.tong_gia,
        idtk: req.body.idtk,
        trang_thai: 0,
        thoi_gian: req.body.ThoiGian
    });

    HoaDon.create(hoadon, (err, _)=>{
        if(err) {
            console.log(err);
            return res.status(500).send({message: err})
        }
        else{
            let check = true;
            req.body.sach.map((value, index)=>{
                let d1 = new Date();
                let id_cthd = 'CTHD'+d1.getTime();
                const cthd = new CTHD({
                    id_cthd: id_cthd,
                    idhd: idhd,
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