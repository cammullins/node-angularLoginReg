var Users = require('./../controllers/users.js');

module.exports = function(app){
  app.post('/register', Users.register);
  app.post('/login', Users.login);
  app.get('/users', Users.index);
  app.get('/session', Users.session);
  app.get('/logout', Users.logout);
}
