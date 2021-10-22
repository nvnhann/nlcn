
module.exports = function (app){
    const hoadon = require('../controllers/HoaDon.controller');
    const authjwt = require('../middleware/authJWT');
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });

    app.post('/api/hoadon',[authjwt.verifyToken], hoadon.create);
    app.get('/api/hoadon', [authjwt.verifyToken], hoadon.getById);
}