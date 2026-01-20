<template>
  <section class="tasks-view-container">
    <header class="tasks-view-container__header">
      <div
        class="tasks-view-container__header-title"
        @click="goToHome"
      >
        <AgcIcon :icon="Back" />
        {{ currentProject?.name }}
        Tasks
      </div>
      <AgcToolbar
        v-model:search-term="searchTerm"
        hide-action
        input-text="Search tasks"
        class="tasks-view-container__input-search"
      />
    </header>
    <div
      v-loading="isLoading"
      class="tasks-view-container__body"
    >
      <AgcTaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @delete="handleConfirmDeleteTask($event.id)"
        @update-description="updateTask($event, task.id)"
        @update-status="updateTask($event, task.id)"
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
import { Plus, Back } from '@element-plus/icons-vue'
import { AgcCard } from '@/components/atoms/AgcCard'
import { AgcIcon } from '@/components/atoms/AgcIcon'
import { AgcToolbar } from '@/components/molecles/AgcToolbar'
import { AgcTextInlineEditor } from '@/components/molecles/AgcTextInlineEditor'
import { AgcTaskCard } from '@/components/molecles/AgcTaskCard'
import { computed, ref, onBeforeMount, nextTick, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useTasksController } from '@/views/TasksView/useTasksController'
import { useMessageBox } from '@/composables/useMessageBox'
import { usePageStore } from '@/stores/pageStore'
import { filterByTerm } from '@/utils'
import { ProjectStatus } from '@/models/projectModel'
import type { Task } from '@/models/taskModel'
import type { ITasksViewProps } from './types.ts'

const messageBox = useMessageBox()
const pageStore = usePageStore()
const router = useRouter()

const searchTerm = ref('')
const isCreatingTask = ref(false)
const newTaskDescription = ref('')

const newTaskInputRef = ref()

const { currentProject } = storeToRefs(pageStore)
const { projectId } = defineProps<ITasksViewProps>()

const filteredTasks = computed((): Task[] => {
  return filterByTerm(tasks.value, searchTerm.value, ['description', 'status'])
})

const {
  isLoading,
  tasks,
  fetchTasks,
  createTask,
  updateTask,
  deleteTask
} = useTasksController(projectId)

onBeforeMount(async () => {
  try {
    await fetchTasks()
  } catch {
    goToHome()
  }
})

onBeforeUnmount(() => {
  currentProject.value = null
})

function handleStartCreate () {
  isCreatingTask.value = true
  nextTick(() => newTaskInputRef.value?.startEdit())
}

async function handleCreateTask (description: string): Promise<void> {
  await createTask(description)
    .then(() => {
      isCreatingTask.value = false
      newTaskDescription.value = ''
    })
}

function handleConfirmDeleteTask (taskId: string) {
  messageBox.confirm(
    'Caution!',
    'Are you sure you want to delete this task?',
    { confirmButtonText: 'Delete' }
  ).then(() => deleteTask(taskId))
}

function goToHome () {
  router.push({
    name: 'projects',
    params: { tab: ProjectStatus.OPEN }
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
    position: relative;
    .tasks-view-container__header-title {
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
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

@media (max-width: 800px) {
  .tasks-view-container {
    .tasks-view-container__body {
      margin-top: 48px;
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
