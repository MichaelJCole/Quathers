const authManagement = require('./authManagement/service');
const users = require('./users/service');

module.exports = function(app) {
  app.configure(authManagement);
  app.configure(users);
};
