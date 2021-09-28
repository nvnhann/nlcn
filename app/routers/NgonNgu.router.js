module.exports = function (app) {
  const ngonngu = require('../controllers/NgonNgu.controller');
  const authjwt = require('../middleware/authJWT');
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });
  app.post('/api/ngonngu', [authjwt.verifyToken, authjwt.isAdmin], ngonngu.create);
  app.get('/api/ngonngu', [authjwt.verifyToken, authjwt.isAdmin], ngonngu.getAll);
  app.delete('/api/ngonngu/:idnn', [authjwt.verifyToken, authjwt.isAdmin], ngonngu.delete);
  app.put('/api/ngonngu/:idnn', [authjwt.verifyToken, authjwt.isAdmin], ngonngu.update);
};
