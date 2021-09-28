module.exports = function (app) {
  const kichthuot = require('../controllers/KichThuot.controller');
  const authjwt = require('../middleware/authJWT');
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });
  app.post('/api/kichthuot', [authjwt.verifyToken, authjwt.isAdmin], kichthuot.create);
  app.get('/api/kichthuot', [authjwt.verifyToken, authjwt.isAdmin], kichthuot.getAll);
  app.delete('/api/kichthuot/:idkt', [authjwt.verifyToken, authjwt.isAdmin], kichthuot.delete);
  app.put('/api/kichthuot/:idkt', [authjwt.verifyToken, authjwt.isAdmin], kichthuot.update);
};
