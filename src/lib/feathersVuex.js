/**
 * The Vuex Store integration
 */
import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'

// This is the "accounts" and "messages" library.
import AuthManagement from 'feathers-authentication-management/lib/client'

// Feathers Client decorations

import feathersClient from './feathersClient'

Vue.use(Vuex)

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, {
  idField: '_id'
  // enableEvents: true // TODO SECURITY Socket.IO
})

Vue.use(FeathersVuex)

// $authManagement handles email verficication, lost password, and notifications
Vue.prototype.$authManagement = new AuthManagement(feathersClient)

export default { feathersService: service, feathersAuth: auth }
