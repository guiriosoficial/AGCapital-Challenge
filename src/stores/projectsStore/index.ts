import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ClientProjects, Project, EditableProject } from './models'
import { ProjectStatuses } from './models'
import * as api from './integrations'

const useProjectsStore = defineStore('projectsStore', () => {
  const currentProject = ref<Project | undefined>()
  const projectsByClients = ref<ClientProjects[]>([])
  const getProjectsByClients = computed((): ClientProjects[] => projectsByClients.value)

  const getCurrentProject = computed((): Project | undefined => currentProject.value)

  function setCurrentProject (project?: Project) {
    currentProject.value = project
  }

  function setProjectsByClients (value: ClientProjects[]) {
    projectsByClients.value = value
  }

  async function searchProjectsByClients (activeTab: ProjectStatuses, searchTerm?: string): Promise<void> {
    const query = { status: activeTab, searchTerm: searchTerm }
    const data = await api.searchProjectsByClients(query)
    projectsByClients.value = data.value
  }

  async function updateProject (projectId: string, body: EditableProject): Promise<void> {
    const data = await api.updateProject(projectId, { ...body })
    const clientIndex = findClientProject(projectId)
    const projectIndex = projectsByClients.value[clientIndex].projects.findIndex((project) => project.id === projectId)
    projectsByClients.value[clientIndex].projects[projectIndex] = data.value
  }

  async function createProject (clientId: string, body: EditableProject): Promise<void> {
    const data = await api.createProject(clientId, { ...body })
    const clientIndex = projectsByClients.value.findIndex((client) => client.id === clientId)
    projectsByClients.value[clientIndex].projects.push(data.value)
  }

  async function deleteProject (projectId: string): Promise<void> {
    await api.deleteProject(projectId)
    const clientIndex = findClientProject(projectId)
    projectsByClients.value[clientIndex].projects = projectsByClients.value[clientIndex].projects.filter((project) => project.id !== projectId)
  }

  function findClientProject (projectId: string): number {
    return projectsByClients.value.findIndex((client) => client.projects.findIndex((project) => project.id === projectId) > -1)
  }

  return {
    getProjectsByClients,
    getCurrentProject,
    setCurrentProject,
    setProjectsByClients,
    searchProjectsByClients,
    updateProject,
    createProject,
    deleteProject
  }
})

export default useProjectsStore

export type {
  ClientProjects,
  EditableProject,
  Project
}

export {
  ProjectStatuses
}
