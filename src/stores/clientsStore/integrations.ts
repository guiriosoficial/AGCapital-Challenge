import type { Client, NewClient } from './models'
import type { Ref } from 'vue'
import { fetch } from '@/utils'

const clientPath = '/clients'

async function createClient (body: NewClient): Promise<Ref<Client>> {
  const response = await fetch(clientPath).put(body).json()
  return response.data
}

async function updateClient (clientId: string, body: NewClient): Promise<Ref<Client>> {
  const response = await fetch(`${clientPath}/${clientId}`).post(body).json()
  return response.data
}

async function deleteClient (clientId: string): Promise<void> {
  await fetch(`${clientPath}/${clientId}`).delete().json()
}

export {
  createClient,
  updateClient,
  deleteClient
}
