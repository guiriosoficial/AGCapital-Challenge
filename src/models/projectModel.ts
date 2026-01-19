import type { Client } from './clientModel.ts'

export enum ProjectStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
}

export type ProjectDoc = Omit<Project, 'id'>

export interface ProjectsByClient extends Client {
  projects: Project[]
}

export class ProjectForm implements ProjectDoc {
  name: string = ''
  description: string = ''
  status: ProjectStatus = ProjectStatus.OPEN

  constructor(
    name: string = '',
    description: string = '',
    status: ProjectStatus = ProjectStatus.OPEN
  ) {
    this.name = name
    this.description = description
    this.status = status
  }
}