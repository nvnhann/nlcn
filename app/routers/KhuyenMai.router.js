module.exports = function (app){
    const khuyenmai = require('../controllers/KhuyenMai.controller');
    const authjwt = require('../middleware/authJWT');
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });

    app.get('/api/khuyenmai',[authjwt.verifyToken, authjwt.isAdmin], khuyenmai.get);
    app.post('/api/khuyenmai', [authjwt.verifyToken, authjwt.isAdmin], khuyenmai.create);
    app.put('/api/khuyenmai/:idkm', [authjwt.verifyToken, authjwt.isAdmin], khuyenmai.update);
    app.delete('/api/khuyenmai/:idkm', [authjwt.verifyToken, authjwt.isAdmin], khuyenmai.delete);
}