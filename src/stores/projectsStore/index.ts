import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ClientProjects, Client, Project } from './models'
import { ProjectStatuses } from './models'

const useProjectsStore = defineStore('projectsStore', () => {
  const projectsByClients = ref<ClientProjects[]>([
    {
      name: 'Google',
      id: 1,
      projects: [
        {
          name: 'Google Search',
          description: 'Search engine for Google',
          id: 4
        },
        {
          name: 'Google Search',
          description: 'Search engine for Google',
          id: 5
        },
        {
          name: 'Google Search',
          description: 'Search engine for Google',
          id: 6
        },
      ]
    },
    {
      name: 'Softplan',
      id: 2,
      projects: [
        {
          name: 'Google Search',
          description: 'Search engine for Google',
          id: 1
        },
        {
          name: 'Google Search',
          description: 'Search engine for Google',
          id: 2
        },
        {
          name: 'Google Search',
          description: 'Search engine for Google',
          id: 3
        },
      ]
    }
  ])
  const getProjectsByClients = computed((): ClientProjects[] => projectsByClients.value)
  async function searchProjectsByClients() {
    return 
  }

  return {
    getProjectsByClients,
    searchProjectsByClients
  }
})

export type { ClientProjects, Client, Project }
export { ProjectStatuses }
export default useProjectsStore