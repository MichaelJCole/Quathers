/**
 * Import all our components into Vue
 * so they can be used globally.  Quasar/webpack tree-shakes
 */

import FormAuth from '../components/FormAuth.vue'
import ModalAuth from '../components/ModalAuth.vue'

export default ({ Vue }) => {
  const components = {
    ModalAuth,
    FormAuth
  }
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
