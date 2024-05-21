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

  async function searchProjectsByClients (activeTab: ProjectStatuses, searchTerm?: string): Promise<void> {
    const query = { status: activeTab, searchTerm: searchTerm }
    const data = await api.searchProjectsByClients(query)
    projectsByClients.value = data.value
  }

  async function updateProject (projectId: string, body: EditableProject): Promise<void> {
    await api.updateProject(projectId, { ...body })
  }

  async function createProject (clientId: string, body: EditableProject): Promise<void> {
    await api.createProject(clientId, { ...body })
  }

  async function deleteProject (projectId: string): Promise<void> {
    await api.deleteProject(projectId)
  }

  return {
    getProjectsByClients,
    getCurrentProject,
    setCurrentProject,
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
