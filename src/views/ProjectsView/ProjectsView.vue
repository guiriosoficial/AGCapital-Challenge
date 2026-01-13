<template>
  <article class="projects-view-container">
    <AgcToolbar
      v-model:search-term="searchTerm"
      :disabled="isLoadingProjects"
      input-text="Search for projects os clients"
      action-text="Add Client"
      class="projects-view-container__tabs-actions"
      @action-click="handleCreateEditClient()"
      @search="handleSearch"
    />
    <AgcTabs v-model="activeTab">
      <AgcTabPane
        v-for="tab in tabs"
        :key="tab.name"
        v-loading="isLoadingProjects"
        :disabled="isLoadingProjects"
        :name="tab.name.toLowerCase()"
        :label="tab.title"
      >
<!--        TODO: Default open-->
        <AgcCollapse class="projects-view-container__collapse-clients">
          <AgcCollapseItem
            v-for="client in projectsByClients"
            :key="client.id"
          >
            <template #title>
              <div class="projects-view-container__collapse-header">
                {{ client.name }}
                <span class="projects-view-container__collapse-header-actions">
                  <AgcIcon
                    :icon="EditPen"
                    :size="16"
                    class="hover-icon"
                    @click.stop="handleCreateEditClient(client)"
                  />
                  <AgcIcon
                    :icon="Delete"
                    :size="16"
                    class="hover-icon hover-icon--danger"
                    @click.stop="handleConfirmDeleteClient(client)"
                  />
                </span>
              </div>
            </template>
            <div class="projects-view-container__projects-list">
              <AgcProjectCard
                v-for="project in client.projects"
                :key="project.id"
                :project="project"
                @click="handleClickProject(project)"
                @edit="handleCreateEditProjectDialog(
                  { id: client.id, name: client.name },
                  project
                )"
                @delete="handleConfirmDeleteProject(project.id, project.name)"
                @move="handleMoveProject(project.id, project.status)"
              />
              <AgcCard
                v-if="activeTab.toUpperCase() === ProjectStatuses.OPEN"
                class="projects-view-container__new-project-card"
                body-class="projects-view-container__new-project-card-body"
                @click="handleCreateEditProjectDialog({ id: client.id, name: client.name })"
              >
                <AgcIcon
                  :icon="Plus"
                  :size="40"
                />
                <span>
                  New Project
                </span>
              </AgcCard>
            </div>
          </AgcCollapseItem>
        </AgcCollapse>
        <div
          v-if="projectsByClients.length === 0"
          class="projects-view-container__empty-state"
        >
          <AgcIcon
            :icon="FolderDelete"
            :size="48"
          />
          No data to show
        </div>
      </AgcTabPane>
    </AgcTabs>
  </article>

  <ClientInfoDialog ref="clientInfoDialogRef" />
  <ProjectInfoDialog ref="projectInfoDialogRef" />
</template>

<script setup lang="ts">
import AgcCard from '@/components/atoms/AgcCard'
import AgcCollapse from '@/components/atoms/AgcCollapse'
import AgcCollapseItem from '@/components/atoms/AgcCollapseItem'
import AgcIcon from '@/components/atoms/AgcIcon'
import AgcTabPane from '@/components/atoms/AgcTabPane'
import AgcTabs from '@/components/atoms/AgcTabs'
import AgcToolbar from '@/components/molecles/AgcToolbar'
import AgcProjectCard from '@/components/molecles/AgcProjectCard'
import { computed, ref, defineAsyncComponent, onBeforeMount } from 'vue'
import { Plus, Delete, EditPen, FolderDelete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import useClientStore, { type Client } from '@/stores/clientsStore'
import { useMessageBox } from '@/composables/useMessageBox'
import useProjectsStore, {
  ProjectStatuses,
  type Project
} from '@/stores/projectsStore'
import { useNotification } from '@/composables/useNotification'
import { storeToRefs } from 'pinia'

const ClientInfoDialog = defineAsyncComponent(() => import('./dialogs/ClientInfoDialog'))
const ProjectInfoDialog = defineAsyncComponent(() => import('./dialogs/ProjectInfoDialog'))

const clientStore = useClientStore()
const messageBox = useMessageBox()
const notification = useNotification()
const projectsStore = useProjectsStore()
const router = useRouter()

const tabs = [
  {
    name: ProjectStatuses.OPEN,
    title: 'Open Projects'
  },
  {
    name: ProjectStatuses.CLOSED,
    title: 'Closed Projects'
  }
]

const projectInfoDialogRef = ref<InstanceType<typeof ProjectInfoDialog> | null>(null)
const clientInfoDialogRef = ref<InstanceType<typeof ClientInfoDialog> | null>(null)
const searchTerm = ref<string>('')

const {
  isLoadingProjects,
  projectsByClients
} = storeToRefs(projectsStore)

const props = defineProps<{ tab: ProjectStatuses }>()

const activeTab = computed({
  get: () => props.tab,
  set: (value: ProjectStatuses) => handleChangeTab(value)
})

onBeforeMount(() => {
  handleFetchData(activeTab.value, searchTerm.value)
})

// TODO: Check param type (remove number on input)
function handleSearch (value?: string | number) {
  handleFetchData(activeTab.value, String(value))
}

function handleChangeTab (tab: ProjectStatuses) {
  router.push({
    name: 'projects',
    params: { tab: tab.toLowerCase() }
  })

  handleFetchData(tab, searchTerm.value)
}

async function handleFetchData (status: ProjectStatuses, searchTerm?: string) {
  try {
    await projectsStore.searchProjectsByClients(status, searchTerm)
  } catch {
    notification.error('Error fetching projects, please try again')
  }
}

function handleCreateEditClient (client?: Client) {
  clientInfoDialogRef.value?.open(client)
}

function handleConfirmDeleteClient (client: Client) {
  messageBox.confirm(
    'Caution!',
    `Are you sure you want to delete this client? (${client.name})`,
    { confirmButtonText: 'Delete' }
  ).then(() => handleDeleteClient(client.id))
}

async function handleDeleteClient (clientId: string) {
  try {
    await clientStore.deleteClient(clientId)
    notification.success('Client deleted successfully')
  } catch {
    notification.error('Error deleting client, please try again')
  }
}

function handleClickProject (project: Project): void {
  projectsStore.setCurrentProject(project)

  router.push({
    name: 'project-tasks',
    params: {
      projectId: project.id
    }
  })
}

function handleCreateEditProjectDialog (client: Client, project?: Project): void {
  projectInfoDialogRef.value?.open({ ...project, client })
}

function handleConfirmDeleteProject (projectId: string, projectName: string): void {
  messageBox.confirm(
    'Caution!',
    `Are you sure you want to delete this project? (${projectName})`,
    { confirmButtonText: 'Delete' }
  ).then(() => handleDeleteProject(projectId))
}

async function handleDeleteProject (projectId: string) {
  try {
    await projectsStore.deleteProject(projectId)
    notification.success('Project deleted successfully')
  } catch {
    notification.error('Error deleting project, please try again')
  }
}

async function handleMoveProject (projectId: string, status: ProjectStatuses): Promise<void> {
  const newStatus = status === ProjectStatuses.OPEN ? ProjectStatuses.CLOSED : ProjectStatuses.OPEN

  try {
    await projectsStore.editProjectStatus(projectId, { status: newStatus })
    notification.success('Project status changed successfully')
  } catch {
    notification.error('Error changing project status, please try again')
  }
}
</script>

<style lang="scss">
.projects-view-container {
  position: relative;
  .el-tabs__header .el-tabs__item {
    font-size: 18px !important;
    height: 48px !important;
  }
  .projects-view-container__tabs-actions {
    position: absolute;
    top: 8px;
    right: 0;
    z-index: 99;
    display: flex;
    gap: 8px;
    width: 400px;
    .projects-view-container__input-search {
      flex: 1;
    }
  }
  .projects-view-container__collapse-clients {
    border: none;
    .el-collapse-item__header {
      line-height: 64px;
      height: 64px;
      .projects-view-container__collapse-header {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 24px;
        gap: 8px;
        .projects-view-container__collapse-header-actions {
          opacity: 0;
          gap: 4px;
          transition: var(--el-transition-duration);
          display: flex;
        }
      }
      &:hover .projects-view-container__collapse-header .projects-view-container__collapse-header-actions {
        opacity: 1;
      }
    }
    .el-collapse-item__wrap {
      border: none;
    }
    .projects-view-container__projects-list {
      display: grid;
      gap: 24px;
      grid-template-columns: repeat(4, 1fr);
      .projects-view-container__new-project-card {
        display: flex;
        align-items: center;
        justify-content: center;
        border-style: dashed !important;
        background-color: var(--el-color-primary);
        color: #FFF;
        cursor: pointer;
        &:hover {
          background-color: var(--el-color-primary-light-3);
        }
      }
      .projects-view-container__new-project-card-body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 8px;
      }
    }
  }
  .projects-view-container__empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 24px;
    padding: 12px;
    color: var(--el-text-color-secondary);
  }
}

@media (max-width: 1600px) {
  .projects-view-container {
    .projects-view-container__collapse-clients {
      .projects-view-container__projects-list {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media (max-width: 1200px) {
  .projects-view-container {
    .projects-view-container__collapse-clients {
      .projects-view-container__projects-list {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}

@media (max-width: 800px) {
  .projects-view-container {
    .el-tabs__header {
      margin-bottom: 48px;
    }
    .projects-view-container__tabs-actions {
      top: 56px;
      width: 100%;
    }
    .projects-view-container__collapse-clients {
      .projects-view-container__projects-list {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
  }
}
</style>
