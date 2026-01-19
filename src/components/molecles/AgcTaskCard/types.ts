import AgcTaskCard from './AgcTaskCard.vue'
import type { Task, TaskDoc } from '@/models/taskModel'

export type AgcTaskCardComponent = InstanceType<typeof AgcTaskCard>

export interface IAgcTaskCardProps {
  task: Task
}

export interface IAgcTaskCardEmits {
  (e: 'delete', task: Task): void
  (e: 'update', task: Partial<TaskDoc>): void
}
