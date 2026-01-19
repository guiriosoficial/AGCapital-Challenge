<template>
  <AgcCard
    class="projects-view-container__project-card"
    @click="handleClickProject"
  >
    <template #header>
      <div class="projects-view-container__project-card-header">
        {{ project.name }}
        <span class="projects-view-container__card-header-actions">
          <AgcIcon
            :icon="EditPen"
            class="hover-icon"
            @click.stop="handleEditProject"
          />
          <AgcIcon
            :icon="Delete"
            class="hover-icon hover-icon--danger"
            @click.stop="handleDeleteProject"
          />
        </span>
      </div>
    </template>
    {{ project.description }}
    <AgcButton
      link
      type="primary"
      class="projects-view-container__project-card-link-action"
      @click.stop="handleMoveProject"
    >
      {{ moveProjectButtonLabel }}
    </AgcButton>
  </AgcCard>
</template>

<script setup lang="ts">
import { AgcButton } from '@/components/atoms/AgcButton'
import { AgcIcon } from '@/components/atoms/AgcIcon'
import { AgcCard } from '@/components/atoms/AgcCard'
import { Delete, EditPen } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { ProjectStatus } from '@/models/projectModel'
import type { IAgcProjectCardProps, IAgcProjectCardEmits } from './types'

const { project } = defineProps<IAgcProjectCardProps>()

const emit = defineEmits<IAgcProjectCardEmits>()

const moveProjectButtonLabel = computed(() => {
  return project.status === ProjectStatus.OPEN
    ? 'Close'
    : 'Reopen'
})

function handleClickProject () {
  emit('click', project)
}

function handleEditProject () {
  emit('edit', project)
}

function handleDeleteProject () {
  emit('delete', project)
}

function handleMoveProject () {
  const newStatus = project.status === ProjectStatus.OPEN
    ? ProjectStatus.CLOSED
    : ProjectStatus.OPEN

  emit('move', newStatus)
}
</script>

<!-- TODO: Review class names -->
<style scoped lang="scss">
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
</style>