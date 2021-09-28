module.exports = function (app) {
  const user = require('../controllers/user.controller');
  const verifySignup = require('../middleware/verifySignup');
  const authJwt = require('../middleware/authJWT');
  app.post('/api/user/signup', [verifySignup.checkDuplicateEmail], user.signup);
  app.post('/api/user/login', user.login);
  app.get('/api/user/getall',[authJwt.verifyToken, authJwt.isAdmin], user.getAll);
};
