export enum TaskStatuses {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

export interface Task {
  id: string
  description: string
  status: TaskStatuses
}

export type NewTasks = Omit<Task, 'id'>