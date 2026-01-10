<template>
  <AgcDialog
    v-if="isOpen"
    v-model="isOpen"
    :title="`Create a new project for ${project?.client.name ?? '...'}`"
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
        @click="handleCreateEditProject"
      >
        {{ isEditingProject ? 'Edit' : 'Create' }}
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
import { useDialog, type IUseDialog } from '@/composables/useDialog'
import useProjectsStore, { type Project, type NewProject, ProjectStatuses } from '@/stores/projectsStore'
import { useNotification } from '@/composables/useNotification'

interface Props extends NewProject, Partial<Omit<Project, keyof NewProject>>{
  client: Client
}

const {
  props: project,
  isDialogVisible,
  toggle
} = useDialog() as IUseDialog<Props>
const projectStore = useProjectsStore()
const notification = useNotification()

type ProjectInfoForm = NewProject

const projectInfoRulesRef = ref<InstanceType<typeof AgcForm>>()

const projectInfoRules = reactive<FormRules<ProjectInfoForm>>({
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

const projectInfoModel = reactive<ProjectInfoForm>({
  name: '',
  description: '',
  status: ProjectStatuses.OPEN
})

const isEditingProject = computed(() => Boolean(project.value?.id))

function handleCloseDialog () {
  isDialogVisible.value = false
}

function handleCreateEditProject () {
  projectInfoRulesRef.value?.instance?.validate((valid: boolean) => {
    if (!valid || !project.value) return

    if (isEditingProject.value && project.value.id) {
      handleEditProject(project.value.id)
    } else {
      handleCreateProject(project.value.client.id)
    }

    handleCloseDialog()
  })
}

async function handleEditProject (projectId: string) {
  try {
    await projectStore.editProject(projectId, projectInfoModel)
    notification.success('Project updated successfully')
  } catch {
    notification.error('Error updating project, please try again')
  }
}

async function handleCreateProject (clientId: string) {
  try {
    await projectStore.createProject(clientId, projectInfoModel)
    notification.success('Project created successfully')
  } catch {
    notification.error('Error creating project, please try again')
  }
}

watch(isDialogVisible, (newVal: boolean): void => {
  if (newVal && project.value?.id) {
    projectInfoModel.name = project.value.name
    projectInfoModel.description = project.value.description
  } else {
    projectInfoModel.name = ''
    projectInfoModel.description = ''
  }
})

defineExpose({
  toggle
})
</script>
