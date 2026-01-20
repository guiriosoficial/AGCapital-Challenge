import type { Project, ProjectStatus } from '@/models/projectModel.ts'

export interface IAgcProjectCardProps {
  project: Project
}

export interface IAgcProjectCardEmits {
  (e: 'edit', project: Project): void
  (e: 'delete', project: Project): void
  (e: 'click', project: Project): void
  (e: 'move', status: ProjectStatus): void
}
