module.exports = function (app) {
  const theloai = require('../controllers/TheLoai.controller');
  const authjwt = require('../middleware/authJWT');
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });
  app.post('/api/theloai', theloai.create);
  app.get('/api/theloai', theloai.getAll);
  app.delete('/api/theloai/:idtl', theloai.delete);
  app.put('/api/theloai/:idtl', theloai.update);
};
