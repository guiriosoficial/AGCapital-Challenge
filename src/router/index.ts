import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  const lowerCasedPath = to.path.toLowerCase()
  if (lowerCasedPath !== to.path) {
    next(lowerCasedPath)
  } else {
    next()
  }
})

export default router
