/**
 * Add feathersClient as Vue.$feathers
 */
import AuthManagement from 'feathers-authentication-management/lib/client'
// import { LocalStorage } from 'quasar'
import feathersClient from '../lib/feathersClient' // new Auth API https://crow.docs.feathersjs.com/api/authentication/client.html#authentication-client

export default ({ Vue, store, router }) => {
  const self = this
  const auth = {
    rememberMe (email) {
      // if (!email) return LocalStorage.getItem('remember_me') || ''
      // LocalStorage.set('remember_me', email)
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
      console.log('start')
      return store
        .dispatch('auth/authenticate', authData)
        .then(() => {
          console.log('complete')
          if (authData.email) self.$auth.rememberMe(authData.email)
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
          return self.$auth.login({
            strategy: 'local',
            email,
            password
          })
        })
    },

    forgot ({ email }) {
      return self.$authManagement
        .sendResetPwd({ email })
    }
  }
  Vue.prototype.$auth = auth
  // API https://github.com/feathers-plus/feathers-authentication-management/blob/master/docs.md#using-feathers-method-calls
  Vue.prototype.$account = new AuthManagement(feathersClient)
}
