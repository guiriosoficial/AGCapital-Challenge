<template>
  <AgcDialog
    v-if="isDialogVisible"
    v-model="isDialogVisible"
    title="Add a new client"
  >
    <AgcForm
      ref="clientInfoRulesRef"
      :model="clientInfoModel"
      :rules="clientInfoRules"
      label-position="top"
    >
      <AgcFormItem
        label="Client name"
        prop="name"
        required
      >
        <AgcInput
          v-model="clientInfoModel.name"
          class="full-width"
        />
      </AgcFormItem>
    </AgcForm>
    <template #footer>
      <AgcButton @click="handleCloseDialog">Cancel</AgcButton>
      <AgcButton
        type="primary"
        @click="handleCreateEditClient"
      >
        {{ isEditingClient ? 'Edit' : 'Create' }}
      </AgcButton>
    </template>
  </AgcDialog>
</template>

<script setup lang="ts">
import { reactive, watch, ref, computed } from 'vue'
import AgcDialog from '@/components/atoms/AgcDialog'
import AgcForm from '@/components/atoms/AgcForm'
import AgcFormItem from '@/components/atoms/AgcFormItem'
import AgcInput from '@/components/atoms/AgcInput'
import AgcButton from '@/components/atoms/AgcButton'
import useDialog, { type UseDialog } from '@/composables/useDialog'
import type { Client } from '@/stores/projectsStore'
import type { FormRules, FormInstance } from 'element-plus'

const {
  dialogProps: client,
  isDialogVisible,
  handleToggleDialog
} = useDialog() as UseDialog & { dialogProps: Client }

interface ClientInfoForm {
  name: string
}

const clientInfoRulesRef = ref<InstanceType<typeof AgcForm>>()

const clientInfoRules = reactive<FormRules<ClientInfoForm>>({
  name: {
    required: true,
    message: 'Please input client name',
    trigger: 'change'
  }
})

const clientInfoModel = reactive<ClientInfoForm>({
  name: '',
})

const isEditingClient = computed(() => Boolean(client.value.id))

function handleCloseDialog(): void {
  isDialogVisible.value = false
}

function handleCreateEditClient(): void {
  clientInfoRulesRef?.value?.instance?.validate((valid) => {
    if (valid) {
      if (isEditingClient.value) {
        // edit client
      } else {
        // create client
      }
      handleCloseDialog()
    }
  })
}

watch(isDialogVisible, (newVal: boolean): void => {
  if (newVal && client.value.id) {
    clientInfoModel.name = client.value.name
  } else {
    clientInfoModel.name = ''
  }
})

defineExpose({
  handleToggleDialog
})
</script>