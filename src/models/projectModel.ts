import type { Client } from './clientModel.ts'

export enum ProjectStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface Project {
  id: string
  name: string
  clientId: string
  description: string
  status: ProjectStatus
}

export type ProjectDoc = Omit<Project, 'id'>

export interface ProjectsByClient extends Client {
  projects: Project[]
}

export class ProjectForm implements Omit<ProjectDoc, 'clientId'> {
  name: string = ''
  description: string = ''
  status: ProjectStatus = ProjectStatus.OPEN
}