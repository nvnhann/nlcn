const multer = require("multer");
const Sach = require("../controllers/Sach.controller");
const authjwt = require("../middleware/authJWT");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./frontend/public/img/product");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = function (app) {
  const authjwt = require("../middleware/authJWT");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/sach",
    [authjwt.verifyToken, authjwt.isAdmin],
    upload.single("hinh_anh"),
    Sach.create
  );
  app.get("/api/sach", Sach.get);
  app.get("/api/sach/:idsach", Sach.getById);
  app.get("/api/chitietsach", Sach.getAll);
  app.get("/api/sachkm", [authjwt.verifyToken, authjwt.isAdmin], Sach.getSachkm);
  app.put(
    "/api/sach/:idsach",
    [authjwt.verifyToken, authjwt.isAdmin],
    upload.single("hinh_anh"),
    Sach.update
  );
  app.delete(
    "/api/sach/:idsach",
    [authjwt.verifyToken, authjwt.isAdmin],
    Sach.delete
  );
};
