import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ClientProjects, Project, EditableProject, NewProject } from './models'
import { ProjectStatuses } from './models'
import * as api from './integrations'
import { assertExists, assertIndex } from "@/utils";

const useProjectsStore = defineStore('projectsStore', () => {
  const currentProject = ref<Project | undefined>()
  const projectsByClients = ref<ClientProjects[]>([])
  const isLoadingProjects = ref<boolean>(false)

  function setCurrentProject (project?: Project) {
    currentProject.value = project
  }

  function setProjectsByClients (value: ClientProjects[]) {
    projectsByClients.value = value
  }

  async function searchProjectsByClients (status: ProjectStatuses, searchTerm?: string): Promise<void> {
    isLoadingProjects.value = true
    const query = { status: status.toUpperCase(), searchTerm }
    const data = await api.searchProjectsByClients(query)
    projectsByClients.value = data.value
    isLoadingProjects.value = false
  }

  async function editProject (projectId: string, body: EditableProject): Promise<void> {
    const data = await api.editProject(projectId, { ...body })

    const clientIndex = findClientIndexByProject(projectId)
    const client = getClientByIndex(clientIndex)

    const projectIndex = assertIndex(
      client.projects.findIndex((project) => project.id === projectId),
      'PROJECT_NOT_FOUND'
    )

    client.projects[projectIndex] = data.value
  }

  async function editProjectStatus (projectId: string, body: EditableProject): Promise<void> {
    await api.editProject(projectId, { ...body })

    const clientIndex = findClientIndexByProject(projectId)
    const client = getClientByIndex(clientIndex)

    client.projects = client.projects.filter(
      (project) => project.id !== projectId
    )
  }

  async function createProject (clientId: string, body: EditableProject): Promise<void> {
    const data = await api.createProject(clientId, { ...body })

    const clientIndex = assertIndex(
      projectsByClients.value.findIndex((client) => client.id === clientId),
      'CLIENT_NOT_FOUND'
    )

    const client = getClientByIndex(clientIndex)

    client.projects.push(data.value)
  }

  async function deleteProject (projectId: string): Promise<void> {
    await api.deleteProject(projectId)

    const clientIndex = findClientIndexByProject(projectId)
    const client = getClientByIndex(clientIndex)

    client.projects = client.projects.filter(
      (project) => project.id !== projectId
    )
  }

  function getClientByIndex (index: number): ClientProjects {
    return assertExists(
      projectsByClients.value[index],
      'CLIENT_NOT_FOUND'
    )
  }

  function findClientIndexByProject (projectId: string): number {
    return assertIndex(
      projectsByClients.value.findIndex((client) =>
        client.projects.some((project) => project.id === projectId)
      ),
      'PROJECT_NOT_FOUND'
    )
  }

  return {
    projectsByClients,
    currentProject,
    isLoadingProjects,
    setCurrentProject,
    setProjectsByClients,
    searchProjectsByClients,
    editProjectStatus,
    editProject,
    createProject,
    deleteProject
  }
})

export default useProjectsStore

export type {
  ClientProjects,
  EditableProject,
  NewProject,
  Project
}

export {
  ProjectStatuses
}
