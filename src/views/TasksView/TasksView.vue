<template>
  <section class="tasks-view-container">
    <header class="tasks-view-container__header">
      <div
        class="tasks-view-container__header-title"
        @click="goToHome"
      >
        <AgcIcon :icon="Back" />
        {{ projectsStore.currentProject?.name }} Tasks
      </div>
      <AgcInput
        v-model="searchQuery"
        :prefix-icon="Search"
        placeholder="Search tasks"
        class="tasks-view-container__input-search"
      />
    </header>
    <div
      v-loading="isLoadingTasks"
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
          @input="handleEditTaskStatus(task.id, $event)"
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
import { useMessageBox } from '@/composables/useMessageBox'
import { useNotification } from '@/composables/useNotification'
import useProjectsStore from '@/stores/projectsStore'
import { storeToRefs } from 'pinia'

const messageBox = useMessageBox()
const notification = useNotification()
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

const { isLoadingTasks, projectTasks } = storeToRefs(tasksStore)

const filteredTasks = computed((): Task[] => {
  return filterByTerm(projectTasks.value, searchQuery.value, ['description', 'status'])
})

onBeforeMount(async () => {
  try {
    await tasksStore.searchTasksByProject(projectId)
  } catch {
    notification.error('Error loading tasks')
    goToHome()
  }
})

async function handleCreateTask (taskDescription: string): Promise<void> {
  try {
    await tasksStore.createTask(projectId, taskDescription)
    notification.success('Task created successfully')
  } catch {
    notification.error('Error creating task, please try again')
  }
}

async function handleEditTaskDescriptions (taskId: string, taskDescription: string): Promise<void> {
  try {
    await tasksStore.updateTaskDescriptions(taskId, taskDescription)
    notification.success('Task description updated successfully')
  } catch {
    notification.error('Error updating task description, please try again')
  }
}

async function handleEditTaskStatus (taskId: string, taskStatus: TaskStatuses): Promise<void> {
  try {
    await tasksStore.updateTaskStatus(taskId, taskStatus)
    notification.success('Task status updated successfully')
  } catch {
    notification.error('Error updating task status, please try again')
  }
}

function handleDeleteTask (taskId: string) {
  messageBox.confirm(
    'Caution!',
    'Are you sure you want to delete this task?',
    { confirmButtonText: 'Delete' }
  ).then(() => {
    tasksStore.deleteTask(taskId)
      .then(() => notification.success('Task deleted successfully'))
      .catch(() => notification.error('Error deleting task, please try again'))
  })
}

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

function goToHome () {
  router.push({
    name: 'projects',
    params: { tab: 'open' }
  })
}
</script>

<style scoped lang="scss">
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
