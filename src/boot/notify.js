/**
 * This is a module for notifications in Vue.  These are the "Welcome back" toaster-like popups
 */
export default ({ Vue, store, router }) => {
  Vue.prototype.$notify = {
    info (message, icon) {
      Vue.prototype.$q.notify({
        icon: icon || 'info',
        message,
        position: 'bottom-left',
        color: 'info',
        closeBtn: 'x',
        timeout: '10000'
      })
    },
    success (message, icon) {
      Vue.prototype.$q.notify({
        icon: icon || 'check_circle_outline',
        message,
        position: 'bottom-left',
        color: 'primary',
        closeBtn: 'x',
        timeout: '2000'
      })
    },
    error (message, icon) {
      Vue.prototype.$q.notify({
        icon: icon || 'check_circle_outline',
        message,
        position: 'bottom-left',
        color: 'negative',
        closeBtn: 'x',
        timeout: '5000'
      })
    }
  }
}
