import { defineStore } from 'pinia'
import type { Client } from './models'

const useClientsStore = defineStore('ClientsStore', () => {
  async function updateClient (clientId: number, clientName: string) {}

  async function createClient (clientName: string) {}

  async function deleteClient (clientId: number) {}

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
