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
      <AgcToolbar
        v-model:search-term="searchQuery"
        hide-action
        input-text="Search tasks"
        class="tasks-view-container__input-search"
      />
    </header>
    <div
      v-loading="isLoadingTasks"
      class="tasks-view-container__body"
    >
      <AgcTaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @delete="handleConfirmDeleteTask($event.id)"
        @update-description="handleEditTaskDescriptions(task.id, $event)"
        @update-status="handleEditTaskStatus(task.id, $event)"
      />

      <AgcCard
        v-if="!isCreatingTask"
        class="tasks-view-container__new-task-card"
        body-class="tasks-view-container__new-task-card-body"
        @click="handleStartCreate"
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
      >
        <AgcTextInlineEditor
          ref="newTaskInputRef"
          v-model="newTaskDescription"
          class="tasks-view-container__task-card-description"
          @update:model-value="handleCreateTask"
          @blur="isCreatingTask = false"
        />
      </AgcCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import {computed, ref, onBeforeMount, nextTick} from 'vue'
import { filterByTerm } from '@/utils'
import { Plus, Back } from '@element-plus/icons-vue'
import useTasksStore, { TaskStatuses, type Task } from '@/stores/tasksStore'
import { useRouter, useRoute } from 'vue-router'
import { AgcCard } from '@/components/atoms/AgcCard'
import { AgcIcon } from '@/components/atoms/AgcIcon'
import { AgcToolbar } from '@/components/molecles/AgcToolbar'
import { AgcTextInlineEditor } from '@/components/molecles/AgcTextInlineEditor'
import { useMessageBox } from '@/composables/useMessageBox'
import { useNotification } from '@/composables/useNotification'
import useProjectsStore from '@/stores/projectsStore'
import { storeToRefs } from 'pinia'
import {AgcTaskCard} from "@/components/molecles/AgcTaskCard";

const messageBox = useMessageBox()
const notification = useNotification()
const projectsStore = useProjectsStore()
const tasksStore = useTasksStore()
const route = useRoute()
const router = useRouter()
const projectId = String(route.params.projectId)

const searchQuery = ref('')
const isCreatingTask = ref(false)
const newTaskDescription = ref('')

const newTaskInputRef = ref()

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

function handleStartCreate () {
  isCreatingTask.value = true
  nextTick(() => newTaskInputRef.value?.startEdit())
}

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

function handleConfirmDeleteTask (taskId: string) {
  messageBox.confirm(
    'Caution!',
    'Are you sure you want to delete this task?',
    { confirmButtonText: 'Delete' }
  ).then(() => handleDeleteTask(taskId))
}

async function handleDeleteTask (taskId: string) {
  try {
    await tasksStore.deleteTask(taskId)
    notification.success('Task deleted successfully')
  } catch {
    notification.error('Error deleting task, please try again')
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

<style lang="scss">
.tasks-view-container {
  .tasks-view-container__body {
    .tasks-view-container__new-task-card {
      .tasks-view-container__new-task-card-body {
        gap: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .tasks-view-container__task-card {
      .tasks-view-container__task-card-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        gap: 16px;
        width: 100%;
      }
    }
  }
}

@media (max-width: 600px) {
  .tasks-view-container {
    .tasks-view-container__task-card {
      .tasks-view-container__task-card-body {
        flex-direction: column;
      }
    }
  }
}
</style>
