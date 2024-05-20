import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const lowerCasedPath = to.path.toLowerCase()
  if (to.path !== lowerCasedPath) {
    next(to.path.toLowerCase())
  } else {
    next()
  }
})

export default router
