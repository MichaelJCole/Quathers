/**
 * The Vuex Store integration
 *
 * See also: src/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from './feathersClient'

Vue.use(Vuex)

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, {
  idField: '_id' // mongo default
  // enableEvents: true // TODO SECURITY Socket.IO
})
Vue.use(FeathersVuex)

export { service as feathersService, auth as feathersAuth }
