import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ClientProjects, Project, EditableProject, NewProject } from './models'
import { ProjectStatuses } from './models'
import * as api from './integrations'

const useProjectsStore = defineStore('projectsStore', () => {
  const currentProject = ref<Project | undefined>()
  const projectsByClients = ref<ClientProjects[]>([])
  const isLoadingProjects = ref<boolean>(false)

  const getProjectsByClients = computed((): ClientProjects[] => projectsByClients.value)

  const getCurrentProject = computed((): Project | undefined => currentProject.value)

  const getIsLoadingProjects = computed((): boolean => isLoadingProjects.value)

  function setCurrentProject (project?: Project) {
    currentProject.value = project
  }

  function setProjectsByClients (value: ClientProjects[]) {
    projectsByClients.value = value
  }

  async function searchProjectsByClients (status: ProjectStatuses, searchTerm?: string): Promise<void> {
    isLoadingProjects.value = true
    const query = { status, searchTerm }
    const data = await api.searchProjectsByClients(query)
    projectsByClients.value = data.value
    isLoadingProjects.value = false
  }

  async function editProject (projectId: string, body: EditableProject): Promise<void> {
    const data = await api.editProject(projectId, { ...body })
    const clientIndex = findClientProject(projectId)
    const projectIndex = projectsByClients.value[clientIndex].projects.findIndex((project) => project.id === projectId)
    projectsByClients.value[clientIndex].projects[projectIndex] = data.value
  }

  async function editProjectStatus (projectId: string, body: EditableProject): Promise<void> {
    await api.editProject(projectId, { ...body })
    const clientIndex = findClientProject(projectId)
    projectsByClients.value[clientIndex].projects = projectsByClients.value[clientIndex].projects.filter((project) => project.id !== projectId)
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
    getIsLoadingProjects,
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
