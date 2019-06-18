const authManagement = require('./authManagement/service');
const users = require('./users/service');

const users = require('./users/users.service.js');

module.exports = function(app) {
  app.configure(authManagement);
  app.configure(users);
  app.configure(users);
};
