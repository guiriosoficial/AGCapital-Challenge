import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from './models'
import { TaskStatuses } from './models'
import * as api from './integrations'

const useTasksStore = defineStore('tasksStore', () => {
  const projectTasks = ref<Task[]>([])

  const getProjectTasks = computed((): Task[] => projectTasks.value)

  async function searchTasksByProject (projectId: string): Promise<void> {
    const data = await api.searchTasksByProject(projectId)
    projectTasks.value = data.value
  }

  async function createTask (projectId: string, taskDescription: string): Promise<void> {
    const body = {
      description: taskDescription,
      status: TaskStatuses.TODO
    }
    await api.createTask(projectId, body)
  }

  async function updateTaskDescriptions (taskId: string, taskDescription: string): Promise<void> {
    const body = { description: taskDescription }
    await api.updateTask(taskId, body)
  }

  async function updateTaskStatus (taskId: string, taskStatus: TaskStatuses): Promise<void> {
    const body = { status: taskStatus }
    await api.updateTask(taskId, body)
  }

  async function deleteTask (taskId: string): Promise<void> {
    await api.deleteTask(taskId)
  }

  return {
    getProjectTasks,
    searchTasksByProject,
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
