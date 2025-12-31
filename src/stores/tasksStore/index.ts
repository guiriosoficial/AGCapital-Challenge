import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from './models'
import { TaskStatuses } from './models'
import * as api from './integrations'
import { assertIndex } from '@/utils'

const useTasksStore = defineStore('tasksStore', () => {
  const projectTasks = ref<Task[]>([])
  const isLoadingTasks = ref<boolean>(false)

  const getProjectTasks = computed((): Task[] => projectTasks.value)

  const getIsLoadingTasks = computed((): boolean => isLoadingTasks.value)

  async function searchTasksByProject (projectId: string): Promise<void> {
    projectTasks.value = []
    isLoadingTasks.value = true
    const query = { projectId: projectId }
    const data = await api.searchTasksByProject(query)
    projectTasks.value = data.value
    isLoadingTasks.value = false
  }

  async function createTask (projectId: string, taskDescription: string): Promise<void> {
    const body = {
      description: taskDescription,
      status: TaskStatuses.TODO
    }
    const data = await api.createTask(projectId, body)
    projectTasks.value.push(data.value)
  }

  async function updateTaskDescriptions (taskId: string, taskDescription: string): Promise<void> {
    const data = await api.updateTask(taskId, { description: taskDescription })

    const taskIndex = assertIndex(
      projectTasks.value.findIndex((task) => task.id === taskId),
      'TASK_NOT_FOUND'
    )

    projectTasks.value[taskIndex] = data.value
  }

  async function updateTaskStatus (taskId: string, taskStatus: TaskStatuses): Promise<void> {
    const data = await api.updateTask(taskId, { status: taskStatus })

    const taskIndex = assertIndex(
      projectTasks.value.findIndex((task) => task.id === taskId),
      'TASK_NOT_FOUND'
    )

    projectTasks.value[taskIndex] = data.value
  }

  async function deleteTask (taskId: string): Promise<void> {
    await api.deleteTask(taskId)
    projectTasks.value = projectTasks.value.filter((task) => task.id !== taskId)
  }

  return {
    getProjectTasks,
    getIsLoadingTasks,
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
