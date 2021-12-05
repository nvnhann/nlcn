module.exports = function (app) {
  const nhomtheloai = require('../controllers/NhomTheLoai.controller');
  const authjwt = require('../middleware/authJWT');
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });
  app.post('/api/nhomtheloai', [authjwt.verifyToken, authjwt.isAdmin], nhomtheloai.create);
  app.get('/api/nhomtheloai', nhomtheloai.getAll);
  app.delete('/api/nhomtheloai/:idntl', [authjwt.verifyToken, authjwt.isAdmin], nhomtheloai.delete);
  app.put('/api/nhomtheloai/:idntl', [authjwt.verifyToken, authjwt.isAdmin], nhomtheloai.update);
};
