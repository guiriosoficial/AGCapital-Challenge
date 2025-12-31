import { defineStore } from 'pinia'
import type { Client, NewClient } from './models'
import useProjectsStore from '../projectsStore'
import * as api from './integrations'
import { assertExists, assertIndex } from '@/utils'

const projectsStore = useProjectsStore()

const useClientsStore = defineStore('ClientsStore', () => {
  async function createClient (client: NewClient): Promise<void> {
    const data = await api.createClient({ ...client })

    const projectsByClients = projectsStore.getProjectsByClients

    projectsByClients.push({
      ...data.value,
      projects: []
    })

    projectsStore.setProjectsByClients(projectsByClients)
  }

  async function updateClient (clientId: string, client: NewClient): Promise<void> {
    const data = await api.updateClient(clientId, { ...client })

    const projectsByClients = projectsStore.getProjectsByClients

    const clientIndex = assertIndex(
      projectsByClients.findIndex((client) => client.id === data.value.id),
      'CLIENT_NOT_FOUND'
    )

    const current = assertExists(
      projectsByClients[clientIndex],
      'CLIENT_NOT_FOUND'
    )

    projectsByClients[clientIndex] = {
      ...data.value,
      projects: current.projects
    }

    projectsStore.setProjectsByClients(projectsByClients)
  }

  async function deleteClient (clientId: string): Promise<void> {
    await api.deleteClient(clientId)

    const projectsByClients = projectsStore
      .getProjectsByClients
      .filter((client) => client.id !== clientId)

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
