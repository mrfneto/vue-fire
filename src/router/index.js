import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useStore } from '../stores'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} - Mrfneto`

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)
  const store = useStore()
  const isAutenticated = await store.getCurrentUser()

  if (requiresAuth && !isAutenticated) next({ name: 'login' })
  else if (requiresUnauth && isAutenticated) next({ name: 'home' })
  else next()
})

export default router
