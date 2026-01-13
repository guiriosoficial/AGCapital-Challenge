import AgcProjectCard from './AgcProjectCard.vue'
import type { Project } from '@/stores/projectsStore'

export type AgcProjectCardComponent = InstanceType<typeof AgcProjectCard>

export interface IAgcProjectCardProps {
  project: Project
}

export interface IAgcProjectCardEmits {
  (e: 'edit', project: Project): void
  (e: 'delete', project: Project): void
  (e: 'click', project: Project): void
  (e: 'move', project: Project): void
}
