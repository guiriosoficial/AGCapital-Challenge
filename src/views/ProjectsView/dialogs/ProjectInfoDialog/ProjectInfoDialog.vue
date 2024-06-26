<template>
  <AgcDialog
    v-if="isDialogVisible"
    v-model="isDialogVisible"
    :title="`Create a new project for ${project.client.name}`"
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
import useDialog, { type UseDialog } from '@/composables/useDialog'
import useProjectsStore, { type Project, type NewProject, ProjectStatuses } from '@/stores/projectsStore'

interface Props extends Project {
  client: Client
}

const {
  dialogProps: project,
  isDialogVisible,
  handleToggleDialog
} = useDialog() as UseDialog & { dialogProps: Props }
const projectStore = useProjectsStore()

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

const isEditingProject = computed(() => Boolean(project.value.id))

function handleCloseDialog () {
  isDialogVisible.value = false
}

function handleCreateEditProject () {
  projectInfoRulesRef.value?.instance?.validate((valid: boolean) => {
    if (valid) {
      if (isEditingProject.value) {
        projectStore.editProject(project.value.id, projectInfoModel)
      } else {
        projectStore.createProject(project.value.client.id, projectInfoModel)
      }
      handleCloseDialog()
    }
  })
}

watch(isDialogVisible, (newVal: boolean): void => {
  if (newVal && project.value.id) {
    projectInfoModel.name = project.value.name
    projectInfoModel.description = project.value.description
  } else {
    projectInfoModel.name = ''
    projectInfoModel.description = ''
  }
})

defineExpose({
  handleToggleDialog
})
</script>
