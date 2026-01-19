import { ref } from 'vue'
import { clone } from '@/utils/clone'
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

  const isLoading = ref(false)
  const projectsByClient = ref<ProjectsByClient[]>([])

  function backup () {
    return clone(projectsByClient.value)
  }

  function rollback (snapshot: ProjectsByClient[]) {
    projectsByClient.value = snapshot
  }

  async function fetchProjects (
    projectStatus: ProjectStatus,
    searchTerm?: string
  ) {
    isLoading.value = true

    try {
      projectsByClient.value = await projectsService.searchProjectsByClient(projectStatus, searchTerm)
    } catch {
      notification.error('Error fetching projects, please try again')
    } finally {
      isLoading.value = false
    }
  }

  async function createClient (form: ClientDoc) {
    const snapshot = backup()
    const tempClient = {
      id: '',
      projects: [],
      ...form,
    }

    projectsByClient.value.push(tempClient)

    try {
      await clientsService.createClient(form)
      notification.success('Client created successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error creating client, please try again')
    }
  }

  async function updateClient (client: Client) {
    const snapshot = backup()

    const clientItem = projectsByClient.value.find((c) => c.id === client.id)
    if (clientItem) Object.assign(clientItem, client)

    try {
      const { id, ...form } = client
      await clientsService.updateClient(form, id)
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

  async function createProject (
    payload: ProjectDoc & { clientId: string }
  ) {
    const { clientId, ...form } = payload
    const snapshot = backup()
    const tempProject = {
      id: '',
      ...form,
    }

    const projectItem = projectsByClient.value.find((c) => c.id === clientId)
    if (projectItem) projectItem.projects.push(tempProject)

    try {
      await projectsService.createProject(form, clientId)
      notification.success('Project created successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error creating project, please try again')
    }
  }

  async function updateProject (project: Project) {
    const { id, ...form } = project
    const snapshot = backup()

    const projectItem = findProject(id)
    if (projectItem) Object.assign(projectItem.project, form)

    try {
      await projectsService.updateProject(form, id)
      notification.success('Project updated successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error updating project, please try again')
    }
  }

  async function deleteProject (projectId: string) {
    const snapshot = backup()

    const projectItem = findProject(projectId)
    if (projectItem) projectItem.client.projects = projectItem.client.projects.filter(p => p.id !== projectId)

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
    const snapshot = backup()
    const tempProject = { status }

    const projectItem = findProject(projectId)
    if (projectItem) Object.assign(projectItem.project, tempProject)

    try {
      await projectsService.updateProject(
        tempProject,
        projectId
      )
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
    isLoading,
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
