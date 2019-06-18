/**
 * Add feathersClient as Vue.$feathers
 */
import AuthManagement from 'feathers-authentication-management/lib/client'
import { LocalStorage } from 'quasar'
import feathersClient from '../lib/feathersClient' // new Auth API https://crow.docs.feathersjs.com/api/authentication/client.html#authentication-client

export default ({ router, store, Vue }) => {
  const self = this
  const auth = {
    rememberMe (email) {
      if (email) return LocalStorage.set('remember_me', email)
      console.log('Help Me! I create a compiletime webpack error: quasar_src_plugins_LocalStorage_js__WEBPACK_IMPORTED_MODULE_1__.default.getItem is not a function')
      // return LocalStorage.getItem('remember_me') || ''
    },

    currentUser (prop) {
      const u = store.state.auth.user || false
      if (u && prop) return u[prop]
      return u
    },

    logout (route) {
      return store.dispatch('auth/logout').then(() => {
        if (route) {
          router.push({ name: route })
          // To clear user data from browser, do a hard refresh/redirect - https://feathers-vuex.feathers-plus.com/common-patterns.html#clearing-data-upon-user-logout
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
        }).catch(err => {
          console.log(err)
          throw err
        })
    },

    register ({ email, password }) {
      // Create the user
      return store
        .dispatch('users/create', {
          email,
          password
        })
        // Then login
        .then(() => {
          return auth.login({
            strategy: 'local',
            email,
            password
          })
        })
    },

    forgot ({ email }) {
      return self.$account.sendResetPwd({ email })
    }
  }
  Vue.prototype.$auth = auth
  // API https://github.com/feathers-plus/feathers-authentication-management/blob/master/docs.md#using-feathers-method-calls
  Vue.prototype.$account = new AuthManagement(feathersClient)
}
