interface Project {
  id: number
  name: string
  description: string
}

interface Client {
  id: number
  name: string
}

interface ClientProjects extends Client {
  projects: Project[]
}

enum ProjectStatuses {
  OPEN = 'OPEN',
  CLOSED = 'DOING',
}


export type {
  Project,
  Client,
  ClientProjects,
}
export { ProjectStatuses }
