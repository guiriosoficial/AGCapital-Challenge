import { fetch, buildQuery } from '@/utils'
import type { EditableProject, ClientProjects, Project } from './models'
import { ProjectStatuses } from './models'
import type { Ref } from 'vue'

const projectsPath = '/projects'

async function searchProjectsByClients (query: Record<string, any>): Promise<Ref<ClientProjects[]>> {
  const response = await fetch(`${projectsPath}?${buildQuery(query)}`).json()
  return response.data
}

async function editProject (projectId: string, body: EditableProject): Promise<Ref<Project>> {
  const response = await fetch(`${projectsPath}/${projectId}`).patch(body).json()
  return response.data
}

async function createProject (clientId: string, body: EditableProject): Promise<Ref<Project>> {
  const response = await fetch(`${projectsPath}/${clientId}`).put(body).json()
  return response.data
}

async function deleteProject (projectId: string): Promise<void> {
  await fetch(`${projectsPath}/${projectId}`).delete().json()
}

export {
  searchProjectsByClients,
  editProject,
  createProject,
  deleteProject
}
