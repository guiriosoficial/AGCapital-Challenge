import type { Client } from '../clientsStore/models'

enum ProjectStatuses {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

interface EditableProject {
  name: string
  description: string
}

interface Project extends EditableProject {
  id: string
}

interface ClientProjects extends Client {
  projects: Project[]
}

export type {
  Project,
  EditableProject,
  ClientProjects
}

export {
  ProjectStatuses
}
