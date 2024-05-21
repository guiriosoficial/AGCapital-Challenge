import type { Client } from '../clientsStore/models'

enum ProjectStatuses {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

interface EditableProject {
  name?: string
  description?: string
  status?: ProjectStatuses
}

interface NewProject {
  name: string
  description: string
  status: ProjectStatuses
}

interface Project extends NewProject {
  id: string
}

interface ClientProjects extends Client {
  projects: Project[]
}

export type {
  Project,
  EditableProject,
  NewProject,
  ClientProjects
}

export {
  ProjectStatuses
}
