<template>
  <article class="projects-view-container">
    <AgcToolbar
      v-model:search-term="searchTerm"
      :disabled="isLoading"
      input-text="Search for projects os clients"
      action-text="Add Client"
      class="projects-view-container__tabs-actions"
      @action-click="handleOpenClientDialog()"
      @search="handleSearch"
    />
    <AgcTabs
      :model-value="activeTab"
      @update:model-value="handleChangeTab"
    >
      <AgcTabPane
        v-for="tab in tabs"
        :key="tab.name"
        v-loading="isLoading"
        :disabled="isLoading"
        :name="tab.name"
        :label="tab.title"
      >
        <!-- TODO: Default open-->
        <AgcCollapse class="projects-view-container__collapse-clients">
          <AgcCollapseItem
            v-for="client in projectsByClient"
            :key="client.id"
          >
            <template #title>
              <div class="projects-view-container__collapse-header">
                {{ client.name }}
                <span class="projects-view-container__collapse-header-actions">
                  <AgcIcon
                    :icon="EditPen"
                    class="hover-icon"
                    @click.stop="handleOpenClientDialog(client)"
                  />
                  <AgcIcon
                    :icon="Delete"
                    class="hover-icon hover-icon--danger"
                    @click.stop="handleDeleteClient(client)"
                  />
                </span>
              </div>
            </template>
            <div class="projects-view-container__projects-list">
              <AgcProjectCard
                v-for="project in client.projects"
                :key="project.id"
                :project="project"
                @click="handleClickProject($event)"
                @edit="handleOpenProjectDialog(
                  { id: client.id, name: client.name },
                  $event
                )"
                @delete="handleConfirmDeleteProject(project.id, project.name)"
                @move="moveProject($event, project.id)"
              />
              <AgcCard
                v-if="isInOpenTab"
                class="projects-view-container__new-project-card"
                body-class="projects-view-container__new-project-card-body"
                @click="handleOpenProjectDialog({ id: client.id, name: client.name })"
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
          v-if="projectsByClient.length === 0"
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

  <ClientInfoDialog
    ref="clientInfoDialogRef"
    @submit:update="handleUpdateClient"
    @submit:create="handleCreateClient"
  />
  <ProjectInfoDialog
    ref="projectInfoDialogRef"
    @submit:update="handleUpdateProject"
    @submit:create="handleCreateProject"
  />
</template>

<script setup lang="ts">
import { AgcCard } from '@/components/atoms/AgcCard'
import { AgcCollapse } from '@/components/atoms/AgcCollapse'
import { AgcCollapseItem } from '@/components/atoms/AgcCollapseItem'
import { AgcIcon } from '@/components/atoms/AgcIcon'
import { AgcTabPane } from '@/components/atoms/AgcTabPane'
import { AgcTabs } from '@/components/atoms/AgcTabs'
import { AgcToolbar } from '@/components/molecles/AgcToolbar'
import { AgcProjectCard } from '@/components/molecles/AgcProjectCard'
import { Plus, Delete, EditPen, FolderDelete } from '@element-plus/icons-vue'
import { computed, ref, defineAsyncComponent, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageBox } from '@/composables/useMessageBox'
import { useProjectsController } from '@/views/ProjectsView/useProjectsController'
import { ProjectStatus, type Project, type ProjectDoc, } from '@/models/projectModel'
import type { Client, ClientDoc } from '@/models/clientModel'
import type { IProjectsViewProps } from './types'

const ClientInfoDialog = defineAsyncComponent(() => import('./dialogs/ClientInfoDialog'))
const ProjectInfoDialog = defineAsyncComponent(() => import('./dialogs/ProjectInfoDialog'))

const messageBox = useMessageBox()
const router = useRouter()

const tabs = [
  {
    name: ProjectStatus.OPEN,
    title: 'Open Projects'
  },
  {
    name: ProjectStatus.CLOSED,
    title: 'Closed Projects'
  }
]

const projectInfoDialogRef = ref<InstanceType<typeof ProjectInfoDialog> | null>(null)
const clientInfoDialogRef = ref<InstanceType<typeof ClientInfoDialog> | null>(null)
const searchTerm = ref<string>('')

const props = defineProps<IProjectsViewProps>()

const activeTab = computed(() => props.tab)

const isInOpenTab = computed(() => activeTab.value === ProjectStatus.OPEN)

onBeforeMount(() => {
  fetchProjects(activeTab.value, searchTerm.value)
})

const {
  isLoading,
  projectsByClient,
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  moveProject,
  createClient,
  updateClient,
  deleteClient
} = useProjectsController()

function handleChangeTab (tab: ProjectStatus) {
  router.push({
    name: 'projects',
    params: { tab }
  })

  fetchProjects(tab, searchTerm.value)
}

function handleSearch (value?: string) {
  fetchProjects(activeTab.value, String(value))
}

function handleOpenClientDialog (client?: Client) {
  clientInfoDialogRef.value?.open(client)
}

async function handleCreateClient (clientInfoForm: ClientDoc) {
  await createClient(clientInfoForm)
    .then(() => clientInfoDialogRef.value?.close())
}

async function handleUpdateClient (clientInfoForm: Client) {
  await updateClient(clientInfoForm)
    .then(() => clientInfoDialogRef.value?.close())
}

function handleDeleteClient (client: Client) {
  messageBox.confirm(
    'Caution!',
    `Are you sure you want to delete this client? (${client.name})`,
    { confirmButtonText: 'Delete' }
  ).then(() => deleteClient(client.id))
}

function handleClickProject (project: Project): void {
  router.push({
    name: 'project-tasks',
    params: { projectId: project.id }
  })
}

function handleOpenProjectDialog (client: Client, project?: Project): void {
  projectInfoDialogRef.value?.open({ ...project, client })
}

async function handleCreateProject (projectInfoModel: ProjectDoc & { clientId: string }) {
  await createProject(projectInfoModel)
    .then(() => projectInfoDialogRef.value?.close())
}

async function handleUpdateProject (projectInfoModel: Project) {
  await updateProject(projectInfoModel)
    .then(() => projectInfoDialogRef.value?.close())
}

function handleConfirmDeleteProject (projectId: string, projectName: string): void {
  messageBox.confirm(
    'Caution!',
    `Are you sure you want to delete this project? (${projectName})`,
    { confirmButtonText: 'Delete' }
  ).then(() => deleteProject(projectId))
}
</script>

<style lang="scss">
.projects-view-container {
  position: relative;
  .el-tabs__header .el-tabs__item {
    font-size: 18px !important;
    height: 48px !important;
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
          font-size: 16px;
          transition: var(--el-transition-duration);
          margin-left: 4px;
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
