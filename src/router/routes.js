
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    // Auth routes
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: 'profile', component: () => import('pages/Index.vue') },
      {
        name: 'reset-password',
        path: 'reset-password',
        component: () => import('pages/AuthResetPassword.vue')
      },
      {
        name: 'verify-email',
        path: 'verify-email',
        component: () => import('pages/AuthVerifyEmail.vue')
      },
      {
        name: 'error',
        path: 'error',
        component: () => import('pages/Error404.vue')
      },
      {
        name: '404',
        path: '*',
        component: () => import('pages/Error404.vue')
      }
    ]
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
