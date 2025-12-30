<template>
  <section class="tasks-view-container">
    <header class="tasks-view-container__header">
      <div
        class="tasks-view-container__header-title"
        @click="backHome()"
      >
        <AgcIcon :icon="Back" />
        {{ projectsStore.getCurrentProject?.name }} Tasks
      </div>
      <AgcInput
        v-model="searchQuery"
        :prefix-icon="Search"
        placeholder="Search tasks"
        class="tasks-view-container__input-search"
      />
    </header>
    <div
        v-loading="isLoading"
        class="tasks-view-container__body"
    >
      <AgcCard
        v-for="task in filteredTasks"
        :key="task.id"
        class="tasks-view-container__task-card"
        body-class="tasks-view-container__task-card-body"
        shadow="hover"
      >
        <AgcTextInlineEditor
          v-model="task.description"
          class="tasks-view-container__task-card-description"
          @change="handleEditTaskDescriptions(task.id, $event)"
        />
        <AgcPopoverInlineEditor
          v-model="task.status"
          :options="statusOptions"
          @change="handleEditTaskStatus(task.id, $event)"
        >
          <template #reference>
            <AgcTag
              :type="getStatusTagTypes(task.status)"
              class="tasks-view-container__task-status-tag"
            >
              {{ task.status }}
            </AgcTag>
          </template>
        </AgcPopoverInlineEditor>
        <AgcIcon
          :icon="Delete"
          class="tasks-view-container__task-card-actions hover-icon hover-icon--danger"
          @click.stop="handleDeleteTask(task.id)"
        />
      </AgcCard>

      <AgcCard
        v-if="!isCreatingTask"
        shadow="hover"
        class="tasks-view-container__new-task-card"
        body-class="tasks-view-container__new-task-card-body"
        @click="isCreatingTask = true"
      >
        <AgcIcon
          :icon="Plus"
          :size="16"
        />
        New Task
      </AgcCard>
      <AgcCard
        v-else
        class="tasks-view-container__task-card"
        body-class="tasks-view-container__task-card-body"
        shadow="always"
      >
        <AgcTextInlineEditor
          v-model="newTaskDescription"
          class="tasks-view-container__task-card-description"
          start-editing
          @change="handleCreateTask($event)"
          @blur="isCreatingTask = false"
        />
      </AgcCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue'
import { filterByTerm } from '@/utils'
import { Plus, Delete, Search, Back } from '@element-plus/icons-vue'
import useTasksStore, { TaskStatuses, type Task } from '@/stores/tasksStore'
import { useRouter, useRoute } from 'vue-router'
import AgcCard from '@/components/atoms/AgcCard'
import AgcIcon from '@/components/atoms/AgcIcon'
import AgcInput from '@/components/atoms/AgcInput'
import AgcPopoverInlineEditor from '@/components/molecles/AgcPopoverInlineEditor'
import AgcTag from '@/components/atoms/AgcTag'
import AgcTextInlineEditor from '@/components/molecles/AgcTextInlineEditor'
import useMessageBox from '@/composables/useMessageBox'
import useProjectsStore from '@/stores/projectsStore'

const messageBox = useMessageBox()
const projectsStore = useProjectsStore()
const tasksStore = useTasksStore()
const route = useRoute()
const router = useRouter()
const projectId = String(route.params.projectId)

const statusOptions = [
  {
    label: 'Todo',
    value: TaskStatuses.TODO
  },
  {
    label: 'Doing',
    value: TaskStatuses.DOING
  },
  {
    label: 'Done',
    value: TaskStatuses.DONE
  },
  {
    label: 'Cancelled',
    value: TaskStatuses.CANCELLED
  }
]

const searchQuery = ref('')
const isCreatingTask = ref(false)
const newTaskDescription = ref('')

const isLoading = computed((): boolean => {
  return tasksStore.getIsLoadingTasks
})

const filteredTasks = computed((): Task[] => {
  return filterByTerm(tasksStore.getProjectTasks, searchQuery.value, ['description', 'status'])
})

onBeforeMount(() => {
  tasksStore.searchTasksByProject(projectId)
})

function getStatusTagTypes (status: TaskStatuses): 'primary' | 'success' | 'info' | 'warning' | 'danger' | undefined {
  switch (status) {
    case TaskStatuses.TODO:
      return 'warning'
    case TaskStatuses.DOING:
      return 'primary'
    case TaskStatuses.DONE:
      return 'success'
    case TaskStatuses.CANCELLED:
      return 'danger'
  }
}

function handleCreateTask (taskDescription: string): void {
  tasksStore.createTask(projectId, taskDescription)
}

function handleEditTaskDescriptions (taskId: string, taskDescription: string): void {
  tasksStore.updateTaskDescriptions(taskId, taskDescription)
}

function handleEditTaskStatus (taskId: string, taskStatus: TaskStatuses): void {
  tasksStore.updateTaskStatus(taskId, taskStatus)
}

function handleDeleteTask (taskId: string) {
  messageBox.confirm(
    'Caution!',
    'Are you sure you want to delete this task?',
    { confirmButtonText: 'Delete' }
  ).then(() => {
    tasksStore.deleteTask(taskId)
  })
}

function backHome () {
  router.push({
    name: 'projects',
    params: { tab: 'open' }
  })
}
</script>

<style lang="scss">
.tasks-view-container {
  .tasks-view-container__header {
    border-bottom: 2px solid var(--el-border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    gap: 16px;
    .tasks-view-container__header-title {
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }
    .tasks-view-container__input-search {
      width: 320px;
    }
  }
  .tasks-view-container__body {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .tasks-view-container__new-task-card {
      cursor: pointer;
      border-style: dashed !important;
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
      font-size: 16px;
      .tasks-view-container__new-task-card-body {
        gap: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:hover {
        background-color: var(--el-color-primary-light-3);
      }
    }
    .tasks-view-container__task-card {
      display: flex;
      align-items: center;
      font-size: 16px;
      .tasks-view-container__task-card-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        gap: 16px;
        width: 100%;
        .tasks-view-container__task-status-tag {
          width: 120px;
          margin-right: 32px;
          font-weight: 500;
          cursor: pointer;
        }
      }
      .tasks-view-container__task-card-actions {
        position: absolute;
        top: 24px;
        right: 24px;
        opacity: 0;
        transition: var(--el-transition-duration);
        display: flex;
        gap: 8px;
        width: fit-content;
      }
      &:hover .tasks-view-container__task-card-actions,
      &:hover .text-inline-editor__inner-actions {
        opacity: 1;
      }
    }
  }
}

@media (max-width: 600px) {
  .tasks-view-container {
    .tasks-view-container__task-card {
      .tasks-view-container__task-card-body {
        flex-direction: column;
        .tasks-view-container__task-card-description {
          width: calc(100% - 40px);
        }
        .tasks-view-container__task-status-tag {
          width: 100%;
          margin-right: 0;
        }
      }
    }
  }
}
</style>
