import { defineStore } from 'pinia'
import type { Client, NewClient } from './models'
import useProjectsStore from '../projectsStore'
import * as api from './integrations'

const projectsStore = useProjectsStore()

const useClientsStore = defineStore('ClientsStore', () => {
  async function createClient (client: NewClient): Promise<void> {
    const data = await api.createClient({ ...client })
    const projectsByClients = projectsStore.getProjectsByClients
    projectsByClients.push({ ...data.value, projects: [] })
    projectsStore.setProjectsByClients(projectsByClients)
  }
  
  async function updateClient (clientId: string, client: NewClient): Promise<void> {
    const data = await api.updateClient(clientId, { ...client })
    const projectsByClients = projectsStore.getProjectsByClients
    const clientIndex = projectsByClients.findIndex((client) => client.id === data.value.id)
    projectsByClients[clientIndex] = { ...data.value, projects: projectsByClients[clientIndex].projects }
    projectsStore.setProjectsByClients(projectsByClients)
  }

  async function deleteClient (clientId: string): Promise<void> {
    await api.deleteClient(clientId)
    const projectsByClients = projectsStore.getProjectsByClients.filter((client) => client.id !== clientId)
    projectsStore.setProjectsByClients(projectsByClients)
  }

  return {
    updateClient,
    createClient,
    deleteClient
  }
})

export default useClientsStore

export type {
  Client
}
