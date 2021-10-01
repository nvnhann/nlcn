module.exports = function (app) {
  const theloai = require("../controllers/TheLoai.controller");
  const authjwt = require("../middleware/authJWT");
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/theloai",
    [authjwt.verifyToken, authjwt.isAdmin],
    theloai.create
  );
  app.get(
    "/api/theloai",
    [authjwt.verifyToken, authjwt.isAdmin],
    theloai.getAll
  );
  app.delete(
    "/api/theloai/:idtl",
    [authjwt.verifyToken, authjwt.isAdmin],
    theloai.delete
  );
  app.put(
    "/api/theloai/:idtl",
    [authjwt.verifyToken, authjwt.isAdmin],
    theloai.update
  );
};
