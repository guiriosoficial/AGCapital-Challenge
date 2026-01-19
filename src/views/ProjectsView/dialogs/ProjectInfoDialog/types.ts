import type { Project, ProjectDoc } from '@/models/projectModel'
import type { Client } from '@/models/clientModel'

export interface IProjectFormDialogProps extends Partial<ProjectDoc>, Partial<Omit<Project, keyof ProjectDoc>> {
  client: Client
}

export interface IProjectFormDialogEmits {
  (e: 'submit:create', project: ProjectDoc & { clientId: string }): void
  (e: 'submit:update', project: Project): void
}
