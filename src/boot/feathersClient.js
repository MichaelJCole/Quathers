/**
 * NOTE:  THESE ARE OLD NOTES ABOUT THE FEATHERS 3.0 IMPELEMNTATION
 *        They can be deleted when we have the notes for 4.0.
 *
 * Authentication with Feathers Backend.
 *
 * Remember, for 3rd-party API's, we us /src/boot/axios.js
 *
 * For our own API's, we use FeathersClient (socket.io & REST)
 *
 * https://docs.feathersjs.com/guides/basics/clients.html
 * https://docs.feathersjs.com/api/authentication/client.html#appconfigureauthoptions
 *
 * Our FeathersClient is in `/src/lib/feathersClient.js`
 * and imported into `/src/store/index.js`
 * which is automatically imported by Quasar's build system.
 *
 * Feathers-vuex integrates Vuex with FeathersClient:
 * https://feathers-vuex.feathers-plus.com/auth-module.html
 *
 * Feathers-Vuex proxies it's authentication/logout actions to FeathersClient
 * https://github.com/feathers-plus/feathers-vuex/blob/master/src/auth-module/actions.js
 *
 * The parameters for these actions are here:
 * https://docs.feathersjs.com/api/authentication/client.html#appauthenticateoptions
 *
 * In addition to this module, you can use FeathersVuex state in UI from here:
 * https://feathers-vuex.feathers-plus.com/auth-module.html
 *
 *
 * This module:
 *
 * Create a Feathers Auth integration for Vue as a Quasar Boot Module.
 *
 * Some use cases:

    // Use case: test if user is authenticated
    if (Vue.$auth.currentUser()) { ... }

    // Use case: get current user's email
    name = Vue.$auth.currentUser("email") || "anonymous"

    // Use case: Login
    Vue.$auth.login({
      email: 'my@email.com',
      password: 'my-password'
    })
    .then(() => {})
    .catch((error) => {});

    // Use case: Logout.  After logout, go to "splash" route
    Vue.$auth.logout("splash")
 */

const error = console.error

import { LocalStorage } from 'quasar'

export default ({ router, store, Vue }) => {
  // Create the API demonstrated above
  const auth = {
    rememberMe (email) {
      if (email) {
        LocalStorage.set('remember_me', email)
      } else {
        return LocalStorage.getItem('remember_me') || ''
      }
    },
    currentUser (prop) {
      const u = store.state.auth.user || false
      if (u && prop) return u[prop]
      return u
    },
    logout (route) {
      return store.dispatch('auth/logout').then(() => {
        if (route) {
          // User data still in browser
          router.push({ name: route })
          // To clear user data, do a hard refresh/redirect - https://feathers-vuex.feathers-plus.com/common-patterns.html#clearing-data-upon-user-logout
          location && location.reload(true)
        }
      })
    },
    login (authData) {
      if (authData !== 'jwt') {
        authData.strategy = 'local'
      }
      return store
        .dispatch('auth/authenticate', authData)
        .then(() => {
          if (authData.email) auth.rememberMe(authData.email)
        })
        .catch(err => {
          error(err)
          throw err
        })
    },

    register ({ email, password }) {
      // Create the user
      let ret = store
        .dispatch('users/create', {
          email,
          password
        })
        // Then login
        .then(() => {
          return auth.login(
            {
              strategy: 'local',
              email,
              password
            },
            quiet
          )
        })
        .catch(error => {
          if (error.className === 'conflict') {
            // user already registered
          }
          throw error
        })
      return ret
    },

    forgot ({ email }) {
      return Vue.prototype.$authManagement
        .sendResetPwd({ email })
        .catch(error => {
          if (error.className === 'bad-request') {
            // This may happen if user hasn't verified their email yet.
            Vue.prototype.$authManagement.resendVerifySignup({ email })
            // Show a message: Account not found.
          }
          throw error
        })
    }
  }

  // Auth from JWT stored in browser before loading the app.  true => suppress token not found error
  auth.login('jwt').catch(err => {}) // if auto login fails, ignore error

  // Add API to Vue
  Vue.prototype.$feathers = feathers
}
