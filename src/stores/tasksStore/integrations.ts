import { fetch, buildQuery } from '@/utils'
import type { NewTask, Task } from './models'
import type { Ref } from 'vue'

const tasksPath = '/tasks'

async function searchTasksByProject (query: {  projectId: string }): Promise<Ref<Task[]>> {
  const response = await fetch(`${tasksPath}?${buildQuery(query)}`).json()
  return response.data
}

async function createTask (projectId: string, body: NewTask) {
  const response = await fetch(`${tasksPath}/${projectId}`).put(body).json()
  return response.data
}

async function updateTask (taskId: string, body: NewTask) {
  const response = await fetch(`${tasksPath}/${taskId}`).patch(body).json()
  return response.data
}

async function deleteTask (taskId: string) {
  const response = await fetch(`${tasksPath}/${taskId}`).delete().json()
  return response.data
}

export {
  searchTasksByProject,
  createTask,
  updateTask,
  deleteTask
}
