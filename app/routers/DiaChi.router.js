
module.exports = function (app) {
  const diachi = require('../controllers/DiaChi.controller');
  const authjwt = require('../middleware/authJWT');
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });
  app.post('/api/diachi',[authjwt.verifyToken], diachi.create);
  app.get('/api/diachi', [authjwt.verifyToken],diachi.getAll);
  app.delete('/api/diachi/:iddc', [authjwt.verifyToken],diachi.delete);
  app.put('/api/diachi/:iddc',[authjwt.verifyToken], diachi.update);
};
