const authManagement = require('./authManagement/service');
const mailer = require('./mailer/mailer.service');

const users = require('./users/service');

module.exports = function(app) {
  app.configure(authManagement);
  app.configure(mailer);
  app.configure(users);
};
