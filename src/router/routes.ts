const ProjectsView = () => import('@/views/ProjectsView')
const TasksView = () => import('@/views/TasksView')

export const routes = [
  {
    path: '/projects',
    children: [
      {
        path: ':tab',
        name: 'projects',
        props: true,
        component: ProjectsView
      },
      {
        path: ':projectId/tasks/',
        name: 'project-tasks',
        props: true,
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
