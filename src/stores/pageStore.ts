import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Project, ProjectStatus } from '@/models/projectModel'

const storeName = 'pageStore'

export const usePageStore = defineStore(storeName, () => {
  const currentProject = ref<Project | null>(null)
  const lastTab = ref<ProjectStatus | null>(null)

  return {
    currentProject,
    lastTab
  }
})