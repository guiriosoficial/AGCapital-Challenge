<template>
  <AgcCard
    class="tasks-view-container__task-card"
    body-class="tasks-view-container__task-card-body"
  >
    <AgcTextInlineEditor
      v-model="task.description"
      class="tasks-view-container__task-card-description"
      @update:model-value="handleEditTaskDescriptions($event)"
    />
    <AgcPopoverInlineEditor
      v-model="task.status"
      :options="statusOptions"
      @update:model-value="handleEditTaskStatus($event)"
    >
      <template #reference>
        <AgcTag
          :type="statusTagTypes"
          class="tasks-view-container__task-status-tag"
        >
          {{ task.status }}
        </AgcTag>
      </template>
    </AgcPopoverInlineEditor>
    <AgcIcon
      :icon="Delete"
      class="tasks-view-container__task-card-actions hover-icon hover-icon--danger"
      @click.stop="handleDeleteTask"
    />
  </AgcCard>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { AgcIcon } from '@/components/atoms/AgcIcon'
import { AgcTextInlineEditor } from '@/components/molecles/AgcTextInlineEditor'
import { AgcCard } from '@/components/atoms/AgcCard'
import { AgcTag } from '@/components/atoms/AgcTag'
import { AgcPopoverInlineEditor } from '@/components/molecles/AgcPopoverInlineEditor'
import { TaskStatuses } from "@/stores/tasksStore";
import { computed } from 'vue'
import type { IAgcTaskCardProps, IAgcTaskCardEmits } from './types'

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

const { task } = defineProps<IAgcTaskCardProps>()

const emit = defineEmits<IAgcTaskCardEmits>()

const statusTagTypes = computed(() => {
  switch (task.status) {
    case TaskStatuses.TODO:
      return 'warning'
    case TaskStatuses.DOING:
      return 'primary'
    case TaskStatuses.DONE:
      return 'success'
    case TaskStatuses.CANCELLED:
      return 'danger'
    default:
      return undefined
  }
})

function handleEditTaskDescriptions (value: string) {
  emit('update-description', value)
}

function handleEditTaskStatus (status: string) {
  emit('update-status', status)
}

function handleDeleteTask () {
  emit('delete', task)
}
</script>

<style scoped lang="scss">
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

@media (max-width: 600px) {
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
</style>

<style lang="scss">
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

@media (max-width: 600px) {
  .tasks-view-container__task-card {
    .tasks-view-container__task-card-body {
      flex-direction: column;
    }
  }
}
</style>