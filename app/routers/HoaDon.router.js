const authjwt = require("../middleware/authJWT");
const hoadon = require("../controllers/HoaDon.controller");

module.exports = function (app){
    const hoadon = require('../controllers/HoaDon.controller');
    const authjwt = require('../middleware/authJWT');
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });

    app.post('/api/hoadon',[authjwt.verifyToken], hoadon.create);
    app.get('/api/hoadon', [authjwt.verifyToken], hoadon.getById);
    app.get('/api/hoadon/getall', [authjwt.verifyToken, authjwt.isAdmin], hoadon.getAll);
    app.get('/api/thongke', [authjwt.verifyToken, authjwt.isAdmin], hoadon.getThongKe);
    app.put('/api/huydon/:idhd', [authjwt.verifyToken], hoadon.huydon);
    app.put('/api/xacnhan/:idhd', [authjwt.verifyToken], hoadon.XacNhan);
    app.put('/api/xacnhanhuy/:idhd', [authjwt.verifyToken], hoadon.XacNhanHuy);



}