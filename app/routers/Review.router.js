module.exports = function(app) {
    const Review = require('../controllers/Review.controller');
    const authJwt = require('../middleware/authJWT.js');
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/review',[authJwt.verifyToken],Review.create);
    app.get('/api/review/:idsach', Review.getById);

};