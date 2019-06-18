import Vue from 'vue'
import Vuex from 'vuex'

import { feathersService, feathersAuth } from '../lib/feathersVuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,

    // FEATHERS integration here - can this be wrapped in a vuex-module returned from lib/feathersVuex.js?
    // See feathers-vuex integration in described in /src/boot/feathersAuth.js
    plugins: [
      feathersService('example'),
      feathersService('users'),
      // Add auth state to vuex store: `const u = store.state.auth.user || false
      feathersAuth({ userService: 'users' }),
      // Add service w/ creates for password reset/etc.
      feathersService('authManagement')
    ]

  })

  return Store
}
