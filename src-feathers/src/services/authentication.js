const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

module.exports = app => {
  const authService = new AuthenticationService(app);

  authService.register('jwt', new JWTStrategy());
  authService.register('local', new LocalStrategy());

  // app.on('login', (authResult, params, context) => {})
  // app.on('logout', (authResult, params, context) => {})

  app.use('/authentication', authService);
  app.configure(expressOauth());
};