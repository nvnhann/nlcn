module.exports = function (app) {
  const nhaxuatban = require('../controllers/NhaXuatBan.controller');
  const authjwt = require('../middleware/authJWT');
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });
  app.post('/api/nhaxuatban', [authjwt.verifyToken, authjwt.isAdmin], nhaxuatban.create);
  app.get('/api/nhaxuatban', [authjwt.verifyToken, authjwt.isAdmin], nhaxuatban.getAll);
  app.delete('/api/nhaxuatban/:idnxb', [authjwt.verifyToken, authjwt.isAdmin], nhaxuatban.delete);
  app.put('/api/nhaxuatban/:idnxb', [authjwt.verifyToken, authjwt.isAdmin], nhaxuatban.update);
};
