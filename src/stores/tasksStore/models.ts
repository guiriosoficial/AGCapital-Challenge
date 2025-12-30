enum TaskStatuses {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

interface NewTask {
  description: string
  status: TaskStatuses
}

interface Task extends NewTask {
  id: string
}

export type {
  Task,
  NewTask
}

export {
  TaskStatuses
}
