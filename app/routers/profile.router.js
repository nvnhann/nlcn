const profile = require("../controllers/profile.controller");
const authJwt = require("../middleware/authJWT");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/profile', [authJwt.verifyToken], profile.create);
    app.get('/api/profile', [authJwt.verifyToken], profile.get);
    app.put('/api/profile', [authJwt.verifyToken], profile.update);
}