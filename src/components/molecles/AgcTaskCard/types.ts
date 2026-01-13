import AgcTaskCard from './AgcTaskCard.vue'
import type { Task } from '@/stores/tasksStore'

export type AgcTaskCardComponent = InstanceType<typeof AgcTaskCard>

export interface IAgcTaskCardProps {
  task: Task
}

export interface IAgcTaskCardEmits {
  (e: 'delete', task: Task): void
  (e: 'update-status', status: string): void
  (e: 'update-description', value: string): void
}
