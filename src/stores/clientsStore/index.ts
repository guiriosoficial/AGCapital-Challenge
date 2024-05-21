import { defineStore } from 'pinia'
import type { Client, NewClient } from './models'
import * as api from './integrations'

const useClientsStore = defineStore('ClientsStore', () => {
  async function createClient (client: NewClient): Promise<void> {
    await api.createClient({ ...client })
  }
  
  async function updateClient (clientId: string, client: NewClient): Promise<void> {
    await api.updateClient(clientId, { ...client })
  }

  async function deleteClient (clientId: string): Promise<void> {
    await api.deleteClient(clientId)
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
