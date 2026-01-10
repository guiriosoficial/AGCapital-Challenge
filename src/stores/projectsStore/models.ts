import type { Client } from '@/stores/clientsStore'

export enum ProjectStatuses {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface EditableProject {
  name?: string
  description?: string
  status?: ProjectStatuses
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatuses
}

export type NewProject = Omit<Project, 'id'>

export interface ClientProjects extends Client {
  projects: Project[]
}
