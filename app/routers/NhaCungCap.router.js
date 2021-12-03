module.exports = function (app) {
  const nhacungcap = require("../controllers/NhaCungCap.controller");
  const authjwt = require("../middleware/authJWT");
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/nhacungcap",
    [authjwt.verifyToken, authjwt.isAdmin],
    nhacungcap.create
  );
  app.get(
    "/api/nhacungcap",
    [authjwt.verifyToken, authjwt.isAdmin],
    nhacungcap.getAll
  );
  app.get('/api/nccxlsx', [authjwt.verifyToken, authjwt.isAdmin], nhacungcap.getExcel);
  app.delete(
    "/api/nhacungcap/:idncc",
    [authjwt.verifyToken, authjwt.isAdmin],
    nhacungcap.delete
  );
  app.put(
    "/api/nhacungcap/:idncc",
    [authjwt.verifyToken, authjwt.isAdmin],
    nhacungcap.update
  );
};
