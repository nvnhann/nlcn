const authjwt = require("../middleware/authJWT");
const tacgia = require("../controllers/TacGia.controller");
module.exports = function (app) {
  const tacgia = require('../controllers/TacGia.controller');
  const authjwt = require('../middleware/authJWT');
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });
  app.post('/api/tacgia', [authjwt.verifyToken, authjwt.isAdmin], tacgia.create);
  app.get('/api/tacgia', tacgia.getAll);
  app.get('/api/tgxlsx', [authjwt.verifyToken, authjwt.isAdmin], tacgia.getExcel);
  app.delete('/api/tacgia/:idtg', [authjwt.verifyToken, authjwt.isAdmin], tacgia.delete);
  app.put('/api/tacgia/:idtg', [authjwt.verifyToken, authjwt.isAdmin], tacgia.update);
};
