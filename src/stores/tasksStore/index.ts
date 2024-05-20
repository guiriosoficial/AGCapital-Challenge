import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from './models'
import { TaskStatuses } from './models'

const useTasksStore = defineStore('tasksStore', () => {
  const projectTasks = ref<Task[]>([
    {
      description: 'Lavar a louça',
      status: TaskStatuses.CANCELLED,
      id: 1
    },
    {
      description: 'separar o lixo e levar até a lixeira',
      status: TaskStatuses.TODO,
      id: 2
    },
    {
      description: 'fazer faxina na casa',
      status: TaskStatuses.DOING,
      id: 3
    },
    {
      description: 'Teste task 4',
      status: TaskStatuses.DONE,
      id: 4
    },
    {
      description: 'tarefa concluida',
      status: TaskStatuses.DONE,
      id: 5
    }
  ])

  const getProjectTasks = computed((): Task[] => projectTasks.value)

  async function searchTasksByClients (projectId: number) {}

  async function createTask (projectId: number, taskDescription: string) {}

  async function updateTaskDescriptions (taskId: number, taskDescription: string) {}

  async function updateTaskStatus (taskId: number, taskStatus: TaskStatuses) {}

  async function deleteTask (taskId: number) {}

  return {
    getProjectTasks,
    searchTasksByClients,
    createTask,
    updateTaskDescriptions,
    updateTaskStatus,
    deleteTask
  }
})

export default useTasksStore

export type {
  Task
}

export {
  TaskStatuses
}