import { ref } from 'vue'
import { cloneDeep } from '@/utils/cloneDeep'
import { projectsService } from '@/services/projectsService'
import { clientsService } from '@/services/clientsService'
import { useNotification } from '@/composables/useNotification'
import type { Client, ClientDoc } from '@/models/clientModel'
import type {
  Project,
  ProjectDoc,
  ProjectsByClient,
  ProjectStatus
} from '@/models/projectModel'

export function useProjectsController () {
  const notification = useNotification()

  const isLoadingData = ref(false)
  const isLoadingDialog = ref(false)
  const projectsByClient = ref<ProjectsByClient[]>([])

  function backup () {
    return cloneDeep(projectsByClient.value)
  }

  function rollback (snapshot: ProjectsByClient[]) {
    projectsByClient.value = snapshot
  }

  async function fetchProjects (
    projectStatus: ProjectStatus,
    searchTerm?: string
  ) {
    isLoadingData.value = true

    try {
      projectsByClient.value = await projectsService.searchProjectsByClient(projectStatus, searchTerm)
    } catch {
      notification.error('Error fetching projects, please try again')
    } finally {
      isLoadingData.value = false
    }
  }

  async function createClient (client: ClientDoc) {
    isLoadingDialog.value = true

    try {
      const newClient = await clientsService.createClient(client)
      projectsByClient.value.push(newClient)
      notification.success('Client created successfully')
    } catch {
      notification.error('Error creating client, please try again')
    } finally {
      isLoadingDialog.value = false
    }
  }

  async function updateClient (client: Client) {
    const { id, ...data } = client
    const snapshot = backup()

    const currentClient = projectsByClient.value.find((c) => c.id === id)
    if (currentClient) Object.assign(currentClient, data)

    try {
      await clientsService.updateClient(data, id)
      notification.success('Client updated successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error updating client, please try again')
    }
  }

  async function deleteClient (clientId: string) {
    const snapshot = backup()

    projectsByClient.value = projectsByClient.value.filter((c) => c.id !== clientId)

    try {
      await clientsService.deleteClient(clientId)
      notification.success('Client deleted successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error deleting client, please try again')
    }
  }

  async function createProject (project: ProjectDoc) {
    isLoadingDialog.value = true

    try {
      const newProject = await projectsService.createProject(project)
      const currentProjectByClient = projectsByClient.value.find((c) => c.id === project.clientId)
      if (currentProjectByClient) currentProjectByClient.projects.push(newProject)
      notification.success('Project created successfully')
    } catch {
      notification.error('Error creating project, please try again')
    } finally {
      isLoadingDialog.value = false
    }
  }

  async function updateProject (project: Project) {
    const { id, ...data } = project
    const snapshot = backup()

    const currentProject = findProject(id)
    if (currentProject) Object.assign(currentProject.project, data)

    try {
      await projectsService.updateProject(data, id)
      notification.success('Project updated successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error updating project, please try again')
    }
  }

  async function deleteProject (projectId: string) {
    const snapshot = backup()

    const currentProject = findProject(projectId)
    if (currentProject) currentProject.client.projects = currentProject.client.projects.filter(p => p.id !== projectId)

    try {
      await projectsService.deleteProject(projectId)
      notification.success('Project deleted successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error deleting project, please try again')
    }
  }

  async function moveProject (
    status: ProjectStatus,
    projectId: string
  ) {
    const data = { status }
    const snapshot = backup()

    const projectItem = findProject(projectId)
    if (projectItem) Object.assign(projectItem.project, data)

    try {
      await projectsService.updateProject(data, projectId)
      notification.success('Project status changed successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error changing project status, please try again')
    }
  }

  function findProject (projectId: string) {
    for (const client of projectsByClient.value) {
      const project = client.projects.find(p => p.id === projectId)
      if (project) {
        return { client, project }
      }
    }
  }

  return {
    isLoadingData,
    isLoadingDialog,
    projectsByClient,
    fetchProjects,
    createClient,
    updateClient,
    deleteClient,
    createProject,
    updateProject,
    deleteProject,
    moveProject
  }
}
