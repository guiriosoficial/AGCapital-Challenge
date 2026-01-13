<template>
  <AgcDialog
    v-if="isOpen"
    v-model="isOpen"
    :title="dialogTitle"
  >
    <AgcForm
      ref="projectInfoRulesRef"
      :model="projectInfoModel"
      :rules="projectInfoRules"
      label-position="top"
      class="full-width"
    >
      <AgcFormItem
        label="Project name"
        prop="name"
        required
      >
        <AgcInput
          v-model="projectInfoModel.name"
          class="full-width"
        />
      </AgcFormItem>
      <AgcFormItem
        label="Project description"
        prop="description"
        required
      >
        <AgcInput
          v-model="projectInfoModel.description"
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
import { reactive, watch, ref, computed } from 'vue'
import AgcButton from '@/components/atoms/AgcButton'
import AgcDialog from '@/components/atoms/AgcDialog'
import AgcForm from '@/components/atoms/AgcForm'
import AgcFormItem from '@/components/atoms/AgcFormItem'
import AgcInput from '@/components/atoms/AgcInput'
import type { Client } from '@/stores/clientsStore'
import type { FormRules } from 'element-plus'
import { useDialog  } from '@/composables/useDialog'
import { useNotification } from '@/composables/useNotification'
import useProjectsStore, { type Project, type NewProject, ProjectStatuses } from '@/stores/projectsStore'

interface Props extends Partial<NewProject>, Partial<Omit<Project, keyof NewProject>> {
  client: Client
}

const {
  props: project,
  isOpen,
  open
} = useDialog<Props>()
const notification = useNotification()
const projectStore = useProjectsStore()

// TODO: Import Type from component
const projectInfoRulesRef = ref<InstanceType<typeof AgcForm>>()

const projectInfoModel = reactive<NewProject>({
  name: '',
  description: '',
  status: ProjectStatuses.OPEN
})

// TODO: Remove FormRules
const projectInfoRules = reactive<FormRules<NewProject>>({
  name: [
    {
      required: true,
      message: 'Please enter a project name',
      trigger: 'change'
    }
  ],
  description: [
    {
      required: true,
      message: 'Please enter a project description',
      trigger: 'change'
    }
  ]
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
  projectInfoRulesRef.value?.validate((valid: boolean) => {
    if (!valid || !project.value) return

    handleCreateEditProject()
  })
}

function handleCreateEditProject () {
  if (isEditingProject.value) {
    handleEditProject()
  } else {
    handleCreateProject()
  }

  handleCloseDialog()
}

async function handleEditProject () {
  try {
    const projectId = project.value?.id ?? ''
    await projectStore.editProject(projectId, projectInfoModel)
    notification.success('Project updated successfully')
  } catch {
    notification.error('Error updating project, please try again')
  }
}

async function handleCreateProject () {
  try {
    const clientId = project.value?.client.id ?? ''
    await projectStore.createProject(clientId, projectInfoModel)
    notification.success('Project created successfully')
  } catch {
    notification.error('Error creating project, please try again')
  }
}

function handleCloseDialog () {
  isOpen.value = false
}

// TODO: Criar model de Reset
watch(isOpen, (newVal: boolean): void => {
  if (newVal && project.value?.id) {
    Object.assign(projectInfoModel, project.value)
  } else {
    Object.assign(projectInfoModel, {
      name: '',
      description: ''
    })
  }
})

defineExpose({
  open
})
</script>
