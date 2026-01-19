// import { defineStore } from 'pinia'
// import type { Client, NewClient } from './models'
// import useProjectsStore from '../projectsStore'
// import { assertExists, assertIndex } from '@/utils'
//
// const projectsStore = useProjectsStore()
//
// const useClientsStore = defineStore('ClientsStore', () => {
//   async function createClient (client: NewClient): Promise<void> {
//     const data = await api.createClient({ ...client })
// ()
//     const projectsByClient = projectsStore.projectsByClient
//
//     projectsByClient.push({
//       ...data.value,
//       projects: []
//     })
//
//     projectsStore.setProjectsByClient(projectsByClient)
//   }
//
//   async function updateClient (clientId: string, client: NewClient): Promise<void> {
//     const data = await api.updateClient(clientId, { ...client })
//
//     const projectsByClient = projectsStore.projectsByClient
//
//     const clientIndex = assertIndex(
//       projectsByClient.findIndex((client) => client.id === data.value.id),
//       'CLIENT_NOT_FOUND'
//     )
//
//     const current = assertExists(
//       projectsByClient[clientIndex],
//       'CLIENT_NOT_FOUND'
//     )
//
//     projectsByClient[clientIndex] = {
//       ...data.value,
//       projects: current.projects
//     }
//
//     projectsStore.setProjectsByClient(projectsByClient)
//   }
//
//   async function deleteClient (clientId: string): Promise<void> {
//     await api.deleteClient(clientId)
//
//     const projectsByClient = projectsStore
//       .projectsByClient
//       .filter((client) => client.id !== clientId)
//
//     projectsStore.setProjectsByClient(projectsByClient)
//   }
//
//   return {
//     updateClient,
//     createClient,
//     deleteClient
//   }
// })
//
// export default useClientsStore
//
// export type {
//   Client
// }
