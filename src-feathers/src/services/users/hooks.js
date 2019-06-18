const { authenticate } = require('@feathersjs/authentication').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
const notifier = require('../authManagement/notifier');
const hooks = require('feathers-hooks-common');

const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword(), verifyHooks.addVerification()],
    update: [hashPassword(), authenticate('jwt')],
    patch: [
      hooks.iff(
        hooks.isProvider('external'), // Don't refactor our iff w/o serious testing
        hooks.preventChanges(
          true,
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        ),
        hashPassword(),
        authenticate('jwt')
      )
    ],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      context => {
        notifier(context.app)('resendVerifySignup', context.result);
      },
      verifyHooks.removeVerification() // remove default verification
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
