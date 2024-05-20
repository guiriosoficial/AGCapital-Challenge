const routes = [
  {
    path: '/projects/:tab',
    name: 'projects',
    component: async () => await import('@/views/ProjectsView')
  },
  {
    path: '/:project/tasks/',
    name: 'project-tasks',
    component: async () => await import('@/views/TasksView')
  },
  {
    path: '/',
    redirect: { name: 'projects', params: { tab: 'open' } }
  }
]

export default routes
