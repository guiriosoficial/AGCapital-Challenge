import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ClientProjects, Project, EditableProject } from './models'
import { ProjectStatuses } from './models'

const useProjectsStore = defineStore('projectsStore', () => {
  const currentProject = ref<Project | undefined>()
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
  
  const getCurrentProject = computed((): Project | undefined => currentProject.value)
  
  function setCurrentProject (project?: Project) {
    currentProject.value = project
  }
  async function searchProjectsByClients() {
    return 
  }

  async function updateProject(projectId: number, project: EditableProject) {}

  async function createProject(project: EditableProject) {}

  async function deleteProject(projectId: number) {}

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