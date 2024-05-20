<template>
  <article class="projects-view-container">
    <div class="projects-view-container__tabs-actions">
      <AgcInput
        v-model="searchQuery"
        :prefix-icon="Search"
        placeholder="Search projects os clients"
        class="projects-view-container__input-search"
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
                <AgcIcon
                  :icon="EditPen"
                  :size="16"
                  @click.stop="handleEditClient(client.id, client.name)"
                  class="projects-view-container__collapse-header-actions hover-icon"
                />
              </div>
            </template>
            <div class="projects-view-container__projects-list">
              <AgcCard
                v-for="project in client.projects"
                :key="project.id"
                shadow="hover"
                @click="handleClickProject(project.id)"
                class="projects-view-container__project-card"
              >
                <template #header>
                  <div class="projects-view-container__project-card-header">
                    {{ project.name }}
                    <span class="projects-view-container__card-header-actions">
                      <AgcIcon
                        :icon="EditPen"
                        class="hover-icon"
                        @click.stop="handleEditProject(
                          { id: project.id, name: project.name, description: project.description },
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
              </AgcCard>
              <AgcCard
                @click="handleCreateProjectDialog({ id: client.id, name: client.name })"
                class="projects-view-container__new-project-card"
                body-class="projects-view-container__new-project-card-body"
                shadow="hover"
              >
                <AgcIcon
                  :icon="Plus"
                  :size="40"
                />
                <span>
                  Novo projeto
                </span>
              </AgcCard>
            </div>
          </AgcCollapseItem>
        </AgcCollapse>
      </AgcTabPane>
    </AgcTabs>
  </article>

  <ProjectInfoDialog ref="projectInfoDialogRef" />
  <ClientInfoDialog ref="clientInfoDialogRef" />
</template>

<script setup lang="ts">
import AgcTabs from '@/components/atoms/AgcTabs'
import AgcTabPane from '@/components/atoms/AgcTabPane'
import AgcCollapse from '@/components/atoms/AgcCollapse'
import AgcCollapseItem from '@/components/atoms/AgcCollapseItem'
import AgcCard from '@/components/atoms/AgcCard'
import AgcButton from '@/components/atoms/AgcButton'
import AgcIcon from '@/components/atoms/AgcIcon'
import AgcInput from '@/components/atoms/AgcInput'
import ProjectInfoDialog from '@/components/molecles/ProjectInfoDialog'
import ClientInfoDialog from '@/components/molecles/ClientInfoDialog'
import useProjectsStore, { type ClientProjects, type Client, type Project } from '@/stores/projectsStore'
import { ProjectStatuses } from '@/stores/projectsStore'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Plus, Delete, EditPen, Search } from '@element-plus/icons-vue'
import  useMessageBox from '@/composables/useMessageBox'

const route = useRoute()
const router = useRouter()
const projectsStore = useProjectsStore()
const messageBox = useMessageBox()

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

const searchQuery = ref('')
const projectInfoDialogRef = ref<InstanceType<typeof ProjectInfoDialog> | null>(null)
const clientInfoDialogRef = ref<InstanceType<typeof ClientInfoDialog> | null>(null)

const activeTab = computed({
  get: (): string => String(route.params.tab),
  set: (value: string) => {
    router.push({
      name: 'projects',
      params: {
        tab: value
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

const activeCollapses = ref<string[]>(mappedClientsIds.value)

function handleClickProject (projectId: number): void {
  router.push({
    name: 'project-tasks',
    params: {
      project: projectId
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

function handleDeleteProject (projectId: number, projectName: string): void {
  messageBox.confirm(
    'Caution!',
    `Are you sure you want to delete this project? (${projectName})`,
    { confirmButtonText: 'Delete' }
  ).then(() => {
    console.log('DELETADO', projectId)
  })
}

function handleCreateClient (): void {
  clientInfoDialogRef.value?.handleToggleDialog()
}

function handleEditClient (clientId: number, clientName: string): void {
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