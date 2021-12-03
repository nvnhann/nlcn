module.exports = function (app) {

    const user = require('../controllers/user.controller');
    const verifySignup = require('../middleware/verifySignup');
    const authJwt = require('../middleware/authJWT');
    app.post('/api/user/signup', [verifySignup.checkDuplicateEmail], user.signup);
    app.post('/api/user/login', user.login);
    app.get('/api/user/getall', [authJwt.verifyToken, authJwt.isAdmin], user.getAll);
    app.post('/api/user/changepwd', [authJwt.verifyToken], user.changPwd);
    app.post('/api/user/forgetpwd', user.changPwdByEmail);
    app.delete('/api/user/:idtk', [authJwt.verifyToken, authJwt.isAdmin], user.delete);


};
