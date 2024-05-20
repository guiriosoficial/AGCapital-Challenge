enum TaskStatuses {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

interface Task {
  description: string
  status: TaskStatuses
  id: number
}

export type { Task }
export { TaskStatuses }
