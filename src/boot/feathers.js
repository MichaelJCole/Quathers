/**
 * Add feathersClient as Vue.$feathers
 *
 * NOTE: The functions below use store.dispatch() which communicates with FeathersJS
 * via feathers-vuex package.
 *
 * See /store/index.js for how it's configured and code for automatic login.
 *
 */
import AuthManagement from 'feathers-authentication-management/lib/client'
import { LocalStorage } from 'quasar'
import feathersClient from '../lib/feathersClient' // new Auth API https://crow.docs.feathersjs.com/api/authentication/client.html#authentication-client

export default ({ router, store, Vue }) => {
  const auth = {
    /**
     * Remember the email previously used.
     * @param {*} email
     */
    rememberMe (email) {
      if (email) return LocalStorage.set('remember_me', email)
      return LocalStorage.getItem('remember_me') || ''
    },

    /**
     * Get the current user object, or a property if specified
     * @param {*} prop
     */
    currentUser (prop) {
      const u = store.state.auth.user || false
      if (u && prop) return u[prop]
      return u
    },

    /**
     * Actively log the current user out and forward to route.
     * Clear rememberMe, tokens, and refresh page to clear memory
     * @param {*} route
     */
    logout (route) {
      // Clear remember_me
      auth.rememberMe('')

      // Clear JWT, and reload the page to clear data from browser - https://feathers-vuex.feathers-plus.com/common-patterns.html#clearing-data-upon-user-logout
      return store.dispatch('auth/logout').then(() => {
        if (route) router.push(route)
        location && location.reload(true)
      })
    },

    /**
     * Login with auth data.  Note store.dispatch() uses feathers-vuex
     * @param {*} authData
     */
    login (authData) {
      if (authData !== 'jwt') {
        authData.strategy = 'local'
      }
      return store
        .dispatch('auth/authenticate', authData)
        .then(() => {
          if (authData.email) auth.rememberMe(authData.email)
        }).catch(err => {
          console.log(err)
          throw err
        })
    },

    /**
     * Register a new account
     */
    register ({ email, password }) {
      // Create the user
      return store
        .dispatch('users/create', { email, password })
        // Then login
        .then(() => {
          return auth.login({ strategy: 'local', email, password })
        })
    },

    /**
     * Send a password reset email
     */
    forgot ({ email }) {
      return Vue.prototype.$account.sendResetPwd({ email })
    }
  }

  Vue.prototype.$auth = auth

  // API https://github.com/feathers-plus/feathers-authentication-management/blob/master/docs.md#using-feathers-method-calls
  Vue.prototype.$account = new AuthManagement(feathersClient)
}
