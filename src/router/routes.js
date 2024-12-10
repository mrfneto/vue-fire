export default [
  {
    path: '/',
    component: () => import('../layouts/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: { title: 'Home' }
      }
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/AuthLayout.vue'),
    meta: { requiresUnauth: true },
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/Register.vue'),
        meta: { title: 'Register' }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: { title: 'Login' }
      },
      {
        path: 'recovery',
        name: 'recovery',
        component: () => import('../views/Recovery.vue'),
        meta: { title: 'Recovery' }
      }
    ]
  }
]
