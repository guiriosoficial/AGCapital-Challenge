import type { Project, ProjectDoc } from '@/models/projectModel'
import type { Client } from '@/models/clientModel'

export interface IProjectFormDialogProps extends Partial<Project> {
  client: Client
}

export interface IProjectInfoDialogProps {
  loading?: boolean
}


export interface IProjectFormDialogEmits {
  (e: 'submit:create', project: ProjectDoc): void
  (e: 'submit:update', project: Project): void
}
