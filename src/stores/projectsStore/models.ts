import type { Client } from '../clientsStore/models'

enum ProjectStatuses {
  OPEN = 'OPEN',
  CLOSED = 'DOING',
}

interface EditableProject {
  name: string
  description: string
}

interface Project extends EditableProject {
  id: number
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
