export enum TaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

export interface Task {
  id: string
  description: string
  status: TaskStatus
}

export type TaskDoc = Omit<Task, 'id'>
