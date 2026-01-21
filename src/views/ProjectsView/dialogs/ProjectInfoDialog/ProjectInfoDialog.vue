<template>
  <AgcDialog
    v-model="isOpen"
    :title="dialogTitle"
    :disabled="loading"
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
          :disabled="loading"
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
          :disabled="loading"
          type="textarea"
          class="full-width"
        />
      </AgcFormItem>
    </AgcForm>
    <template #footer>
      <AgcButton
        :disabled="loading"
        @click="handleCloseDialog"
      >
        Cancel
      </AgcButton>
      <AgcButton
        type="primary"
        :loading="loading"
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
import type {IProjectFormDialogProps, IProjectFormDialogEmits, IProjectInfoDialogProps} from './types'

const {
  props: project,
  isOpen,
  open,
  close
} = useDialog<IProjectFormDialogProps>()

const { loading } = defineProps<IProjectInfoDialogProps>()

const emit = defineEmits<IProjectFormDialogEmits>()

const projectFormRef = ref<AgcFormInstance | null>(null)

const projectForm = reactive<ProjectForm>(new ProjectForm)

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

const client = computed(() => project.value?.client)

const dialogTitle = computed(() => {
  return isEditingProject.value
    ? `Edit ${project.value?.name} project of ${client.value?.name}`
    : `Create a new project for ${client.value?.name}`
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
      ...projectForm,
      clientId: client.value!.id,
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

// TODO: Evitar que ID seja setado no projectForm
watch(isOpen, (newVal: boolean): void => {
  if (newVal && isEditingProject.value && project.value) {
    const {
      client: _client,
      id: _id,
      ...form
    } = project.value
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
