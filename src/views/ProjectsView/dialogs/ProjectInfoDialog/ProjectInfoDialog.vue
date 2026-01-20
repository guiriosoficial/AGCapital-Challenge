<template>
  <AgcDialog
    v-model="isOpen"
    :title="dialogTitle"
  >
    <AgcForm
      ref="projectFormRef"
      :model="projectForm"
      :rules="projectFormRules"
      class="full-width"
    >
      <AgcFormItem
        label="Project name"
        prop="name"
        required
      >
        <AgcInput
          v-model="projectForm.name"
          class="full-width"
        />
      </AgcFormItem>
      <AgcFormItem
        label="Project description"
        prop="description"
        required
      >
        <AgcInput
          v-model="projectForm.description"
          type="textarea"
          class="full-width"
        />
      </AgcFormItem>
    </AgcForm>
    <template #footer>
      <AgcButton @click="handleCloseDialog">
        Cancel
      </AgcButton>
      <AgcButton
        type="primary"
        @click="handleValidateProject"
      >
        {{ confirmButtonLabel }}
      </AgcButton>
    </template>
  </AgcDialog>
</template>

<script setup lang="ts">
import { AgcForm, type AgcFormInstance, type AgcFormRules } from '@/components/atoms/AgcForm'
import { AgcButton } from '@/components/atoms/AgcButton'
import { AgcDialog } from '@/components/atoms/AgcDialog'
import { AgcFormItem } from '@/components/atoms/AgcFormItem'
import { AgcInput } from '@/components/atoms/AgcInput'
import { reactive, watch, ref, computed } from 'vue'
import { useDialog  } from '@/composables/useDialog'
import { ProjectForm } from '@/models/projectModel'
import type { IProjectFormDialogProps, IProjectFormDialogEmits } from './types'

const {
  props: project,
  isOpen,
  open,
  close
} = useDialog<IProjectFormDialogProps>()

const emit = defineEmits<IProjectFormDialogEmits>()

const projectFormRef = ref<AgcFormInstance | null>(null)

const projectForm = reactive<ProjectForm>(new ProjectForm())

const projectFormRules = reactive<AgcFormRules<ProjectForm>>({
  name: {
    required: true,
    message: 'Please enter a project name',
    trigger: 'change'
  },
  description: {
    required: true,
    message: 'Please enter a project description',
    trigger: 'change'
  }
})

const isEditingProject = computed(() => Boolean(project.value?.id))

const dialogTitle = computed(() => {
  return isEditingProject.value
    ? `Edit ${project.value?.name} project of ${project.value?.client.name}`
    : `Create a new project for ${project.value?.client.name}`
})

const confirmButtonLabel = computed(() => {
  return isEditingProject.value
    ? 'Edit'
    : 'Create'
})

function handleValidateProject () {
  projectFormRef.value?.validate((valid: boolean) => {
    if (!valid || !project.value) return

    handleCreateEditProject()
  })
}

function handleCreateEditProject () {
  if (isEditingProject.value) {
    const eventForm = {
      id: project.value?.id ?? '',
      ...projectForm
    }
    emit('submit:update', eventForm)
  } else {
    const eventForm = {
      clientId: project.value?.client.id ??  '',
      ...projectForm
    }
    emit('submit:create', eventForm)
  }

  handleCloseDialog()
}

function handleCloseDialog () {
  isOpen.value = false
  projectFormRef.value?.resetFields()
  projectFormRef.value?.resetValidation()
}

watch(isOpen, (newVal: boolean): void => {
  if (newVal && project.value?.id) {
    const { client: _client, ...form } = project.value
    Object.assign(projectForm, form)
  } else {
    Object.assign(projectForm, new ProjectForm)
  }
})

defineExpose({
  open,
  close
})
</script>
