<template>
  <AgcCard
    class="task-card"
    body-class="task-card__body"
  >
    <AgcTextInlineEditor
      :model-value="task.description"
      class="task-card__description"
      @update:model-value="handleEditTaskDescriptions($event)"
    />
    <AgcPopoverInlineEditor
      :model-value="task.status"
      :options="statusOptions"
      @update:model-value="handleEditTaskStatus($event)"
    >
      <template #reference>
        <AgcTag
          :type="statusTagTypes"
          class="task-card__status-tag"
        >
          {{ task.status }}
        </AgcTag>
      </template>
    </AgcPopoverInlineEditor>
    <AgcIcon
      :icon="Delete"
      class="task-card__actions hover-icon hover-icon--danger"
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
import { computed } from 'vue'
import { TaskStatus } from '@/models/taskModel'
import type { IAgcTaskCardProps, IAgcTaskCardEmits } from './types'

const statusOptions = [
  {
    label: 'Todo',
    value: TaskStatus.TODO
  },
  {
    label: 'Doing',
    value: TaskStatus.DOING
  },
  {
    label: 'Done',
    value: TaskStatus.DONE
  },
  {
    label: 'Cancelled',
    value: TaskStatus.CANCELLED
  }
]

const { task } = defineProps<IAgcTaskCardProps>()

const emit = defineEmits<IAgcTaskCardEmits>()

const statusTagTypes = computed(() => {
  switch (task.status) {
    case TaskStatus.TODO:
      return 'warning'
    case TaskStatus.DOING:
      return 'primary'
    case TaskStatus.DONE:
      return 'success'
    case TaskStatus.CANCELLED:
      return 'danger'
    default:
      return undefined
  }
})

function handleEditTaskDescriptions (description: string) {
  emit('update', { description })
}

function handleEditTaskStatus (status: TaskStatus) {
  emit('update', { status })
}

function handleDeleteTask () {
  emit('delete', task)
}
</script>

<style scoped lang="scss">
.task-card {
  font-size: 16px;
  .task-card__body {
    .task-card__status-tag {
      width: 120px;
      margin-right: 32px;
      font-weight: 500;
      cursor: pointer;
    }
  }
  .task-card__actions {
    position: absolute;
    top: 24px;
    right: 24px;
    opacity: 0;
    transition: var(--el-transition-duration);
    display: flex;
    gap: 8px;
    width: fit-content;
  }
  &:hover .task-card__actions,
  &:hover .text-inline-editor__inner-actions {
    opacity: 1;
  }
}

@media (max-width: 600px) {
  .task-card {
    .task-card__body {
      flex-direction: column;
      .task-card__description {
        width: calc(100% - 40px);
      }
      .task-card__status-tag {
        width: 100%;
        margin-right: 0;
      }
    }
  }
}
</style>

<style lang="scss">
.task-card {
  .task-card__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    gap: 16px;
    width: 100%;
  }
}

@media (max-width: 600px) {
  .task-card {
    .task-card__body {
      flex-direction: column;
    }
  }
}
</style>