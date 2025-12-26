<template>
  <article class="projects-view-container">
    <div class="projects-view-container__tabs-actions">
      <AgcInput
        v-model="searchTerm"
        :prefix-icon="Search"
        placeholder="Search projects os clients"
        class="projects-view-container__input-search"
        @input="handleSearchTerm"
      />
      <AgcButton
        type="primary"
        :icon="Plus"
        class="hover-icon"
        @click="handleCreateClient"
      >
        Add Client
      </AgcButton>
    </div>
    <AgcTabs
      v-model="activeTab"
      @tab-change="handleChangeTab"
    >
      <AgcTabPane
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name.toLowerCase()"
        :label="tab.title"
      >
        <AgcCollapse
          v-model="activeCollapses"
          class="projects-view-container__collapse-clients"
        >
          <AgcCollapseItem
            v-for="client in projects"
            :key="client.id"
            :name="String(client.id)"
            :title="client.name"
          >
            <template #title>
              <div class="projects-view-container__collapse-header">
                {{ client.name }}
                <span class="projects-view-container__collapse-header-actions">
                  <AgcIcon
                    :icon="EditPen"
                    :size="16"
                    class="hover-icon"
                    @click.stop="handleEditClient(client.id, client.name)"
                  />
                  <AgcIcon
                    :icon="Delete"
                    :size="16"
                    class="hover-icon hover-icon--danger"
                    @click.stop="handleDeleteClient(client.id, client.name)"
                  />
                </span>
              </div>
            </template>
            <div class="projects-view-container__projects-list">
              <AgcCard
                v-for="project in client.projects"
                :key="project.id"
                shadow="hover"
                class="projects-view-container__project-card"
                @click="handleClickProject(project)"
              >
                <template #header>
                  <div class="projects-view-container__project-card-header">
                    {{ project.name }}
                    <span class="projects-view-container__card-header-actions">
                      <AgcIcon
                        :icon="EditPen"
                        class="hover-icon"
                        @click.stop="handleEditProject(
                          project,
                          { id: client.id, name: client.name }
                        )"
                      />
                      <AgcIcon
                        :icon="Delete"
                        class="hover-icon hover-icon--danger"
                        @click.stop="handleDeleteProject(project.id, project.name)"
                      />
                    </span>
                  </div>
                </template>
                {{ project.description }}
                <AgcButton
                  link
                  type="primary"
                  class="projects-view-container__project-card-link-action"
                  @click.stop="handleMoveProject(project.id, project.status)"
                >
                  {{ project.status === ProjectStatuses.OPEN ? 'Close' : 'Reopen' }}
                </AgcButton>
              </AgcCard>
              <AgcCard
                v-if="activeTab.toUpperCase() === ProjectStatuses.OPEN"
                class="projects-view-container__new-project-card"
                body-class="projects-view-container__new-project-card-body"
                shadow="hover"
                @click="handleCreateProjectDialog({ id: client.id, name: client.name })"
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
          v-if="projects.length === 0"
          class="projects-view-container__empty-state"
        >
          <AgcIcon :icon="FolderDelete" :size="48" />
          No data to show
        </div>
      </AgcTabPane>
    </AgcTabs>
  </article>

  <ProjectInfoDialog ref="projectInfoDialogRef" />
  <ClientInfoDialog ref="clientInfoDialogRef" />
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount, watch, defineAsyncComponent } from 'vue'
import { Plus, Delete, EditPen, Search, FolderDelete } from '@element-plus/icons-vue'
import { useDebounce } from '@/composables/useDebounce'
import { useRoute, useRouter } from 'vue-router'
import AgcButton from '@/components/atoms/AgcButton'
import AgcCard from '@/components/atoms/AgcCard'
import AgcCollapse from '@/components/atoms/AgcCollapse'
import AgcCollapseItem from '@/components/atoms/AgcCollapseItem'
import AgcIcon from '@/components/atoms/AgcIcon'
import AgcInput from '@/components/atoms/AgcInput'
import AgcTabPane from '@/components/atoms/AgcTabPane'
import AgcTabs from '@/components/atoms/AgcTabs'
import useClientStore, { type Client } from '@/stores/clientsStore'
import useMessageBox from '@/composables/useMessageBox'
import useProjectsStore, { type ClientProjects, type Project, ProjectStatuses } from '@/stores/projectsStore'

const ClientInfoDialog = defineAsyncComponent(() => import('./dialogs/ClientInfoDialog'))
const ProjectInfoDialog = defineAsyncComponent(() => import('./dialogs/ProjectInfoDialog'))

const clientStore = useClientStore()
const messageBox = useMessageBox()
const projectsStore = useProjectsStore()
const route = useRoute()
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

const activeTab = computed({
  get: (): string => String(route.params.tab),
  set: (value: string) => {
    router.push({
      name: 'projects',
      params: {
        tab: value.toLowerCase()
      }
    })
  }
})

const projects = computed((): ClientProjects[] => {
  return projectsStore.getProjectsByClients
})

const mappedClientsIds = computed((): string[] => {
  return projectsStore
    .getProjectsByClients
    .map((client: ClientProjects) => String(client.id))
})

const activeCollapses = ref<string[]>([])

onBeforeMount(() => {
  handleUpdateData(activeTab.value, searchTerm.value)
})

watch(mappedClientsIds, (): void => {
  activeCollapses.value = mappedClientsIds.value
})

function handleUpdateData (status: string, searchTerm?: string): void {
  projectsStore.searchProjectsByClients(
    status.toUpperCase() as ProjectStatuses,
    searchTerm
  ).then(() => {
    activeCollapses.value = mappedClientsIds.value
  })
}

function handleChangeTab (event: string): void {
  handleUpdateData(event, searchTerm.value)
}

const handleSearchTerm = useDebounce((event: string) => {
  handleUpdateData(activeTab.value, event)
}, 800) 

function handleClickProject (project: Project): void {
  projectsStore.setCurrentProject(project)
  router.push({
    name: 'project-tasks',
    params: {
      projectId: project.id
    }
  })
}

function handleCreateProjectDialog (client: Client): void {
  projectInfoDialogRef.value?.handleToggleDialog({ client })
}

function handleEditProject (project: Project, client: Client): void {
  projectInfoDialogRef.value?.handleToggleDialog({
    ...project,
    client
  })
}

function handleMoveProject (projectId: string, status: ProjectStatuses): void {
  const newStatus = status === ProjectStatuses.OPEN ? ProjectStatuses.CLOSED : ProjectStatuses.OPEN
  projectsStore.editProjectStatus(projectId, { status: newStatus })
}

function handleDeleteProject (projectId: string, projectName: string): void {
  messageBox.confirm(
    'Caution!',
    `Are you sure you want to delete this project? (${projectName})`,
    { confirmButtonText: 'Delete' }
  ).then(() => {
    projectsStore.deleteProject(projectId)
  })
}

function handleCreateClient (): void {
  clientInfoDialogRef.value?.handleToggleDialog()
}

function handleDeleteClient (clientId: string, clientName: string): void {
  messageBox.confirm(
    'Caution!',
    `Are you sure you want to delete this client? (${clientName})`,
    { confirmButtonText: 'Delete' }
  ).then(() => {
    clientStore.deleteClient(clientId)
  })
}

function handleEditClient (clientId: string, clientName: string): void {
  clientInfoDialogRef.value?.handleToggleDialog({
    id: clientId,
    name: clientName
  })
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
      .projects-view-container__project-card {
        // background-color: var(--el-bg-color-page);
        background: linear-gradient(162deg, rgba(64,158,255,0.2) 0%, rgba(64,158,255,0) 100%);
        cursor: pointer;
        .projects-view-container__project-card-link-action {
          float: right;
          font-size: 16px;
          margin: 12px -4px -4px 12px;
        }
        .projects-view-container__project-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 500;
          font-size: 16px;
          .projects-view-container__card-header-actions {
            display: flex;
            gap: 4px;
            opacity: 0;
            transition: var(--el-transition-duration);
            cursor: pointer;
          }
        }
        &:hover .projects-view-container__project-card-header .projects-view-container__card-header-actions {
          opacity: 1;
        }
      }
    }
  }
  .projects-view-container__empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 12px
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
