<template>
  <section class="tasks-view-container">
    <header class="tasks-view-container__header">
      <div
        class="tasks-view-container__header-title"
        @click="backHome()"
      >
        <AgcIcon :icon="Back" />
        Tasks
      </div>
      <AgcInput
          v-model="searchQuery"
          :prefix-icon="Search"
          placeholder="Search tasks"
          class="tasks-view-container__input-search"
        />
    </header>
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
        @change="handleEditTask(task.id, $event)"
      />
      <AgcPopoverInlineEditor
        :options="statusOptions"
        v-model="task.status"
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
      @click="isCreatingTask = true"
    >
      <AgcIcon
        :icon="Plus"
        :size="12"
      />
      &nbsp;New Task
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
        @change="handleCreateTask($event)"
        @blur="isCreatingTask = false"
        start-editing
      />
    </AgcCard>
  </section>
</template>

<script setup lang="ts">
import AgcCard from '@/components/atoms/AgcCard'
import AgcIcon from '@/components/atoms/AgcIcon'
import AgcInput from '@/components/atoms/AgcInput'
import AgcTag from '@/components/atoms/AgcTag'
import AgcTextInlineEditor from '@/components/molecles/AgcTextInlineEditor'
import AgcPopoverInlineEditor from '@/components/molecles/AgcPopoverInlineEditor'
import useTasksStore from '@/stores/tasksStore'
import { TaskStatuses } from '@/stores/tasksStore'
import { Plus, Delete, Search, Back } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import  useMessageBox from '@/composables/useMessageBox'
import { filterByTerm } from '@/utils'
import { useRouter } from 'vue-router'

const tasksStore = useTasksStore()
const messageBox = useMessageBox()
const router = useRouter()

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

const filteredTasks = computed(() => {
  return filterByTerm(tasksStore.getProjectTasks, searchQuery.value, ['description', 'status'])
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

function handleCreateTask(taskDescription: string ): void {

}

function handleEditTask(taskId: number, taskDescription: string): void {
  
}

function handleDeleteTask(taskId: number) {
  messageBox.confirm(
    'Caution!',
    `Are you sure you want to delete this task?`,
    { confirmButtonText: 'Delete' }
  ).then(() => {
    console.log('DELETADO', taskId)
  })
}

function backHome() {
  router.push({
    name: 'projects',
    params: { tab: 'open' }
  })
}
</script>

<style lang="scss">
.tasks-view-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  .tasks-view-container__new-task-card {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 8px;
    border-style: dashed !important;
    background-color: var(--el-color-primary);
    color: #FFF;
    font-size: 16px;
    vertical-align: middle;
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
        cursor: pointer
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