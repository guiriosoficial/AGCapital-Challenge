const ProjectsView = () => import('@/views/ProjectsView')
const TasksView = () => import('@/views/TasksView')

export const routes = [
  {
    path: '/projects',
    children: [
      {
        path: ':tab',
        name: 'projects',
        component: ProjectsView,
        props: true
      },
      {
        path: 'id/:projectId/tasks/',
        name: 'project-tasks',
        component: TasksView
      },
      {
        path: '',
        redirect: {
          name: 'projects',
          params: { tab: 'open' }
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'projects',
      params: { tab: 'open' }
    }
  }
]
