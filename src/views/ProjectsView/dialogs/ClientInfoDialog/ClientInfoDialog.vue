<template>
  <AgcDialog
    v-if="isOpen"
    v-model="isOpen"
    :title="dialogTitle"
  >
    <AgcForm
      ref="clientInfoFormRef"
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
      <AgcButton @click="handleCloseDialog">
        Cancel
      </AgcButton>
      <AgcButton
        type="primary"
        @click="handleValidateClient"
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
import type { FormRules } from 'element-plus'
import useClientStore, { type Client } from '@/stores/clientsStore'
import { useDialog } from '@/composables/useDialog'
import { useNotification } from '@/composables/useNotification'
import type { NewClient } from "@/stores/clientsStore/models.ts";

interface ClientInfoForm {
  name: string
}

const {
  props: client,
  isOpen,
  open
} = useDialog<Client>()
const notification = useNotification()
const clientStore = useClientStore()

// TODO: Import Type from component
const clientInfoFormRef = ref<InstanceType<typeof AgcForm> | null>(null)

const clientInfoModel = reactive<NewClient>({
  name: ''
})

// TODO: Abstrair FormRules
const clientInfoRules = reactive<FormRules<ClientInfoForm>>({
  name: {
    required: true,
    message: 'Please input client name',
    trigger: 'change'
  }
})

const isEditingClient = computed(() => Boolean(client.value?.id))

const dialogTitle = computed(() => {
  return isEditingClient.value
    ? `Edit ${client.value?.name}`
    : 'Add a new client'
})

const confirmButtonLabel = computed(() => {
  return isEditingClient.value
    ? 'Edit'
    : 'Create'
})

function handleValidateClient () {
  clientInfoFormRef?.value?.validate((valid) => {
    if (!valid) return

    handleEditCreateClient()
  })
}

function handleEditCreateClient () {
  if (isEditingClient.value) {
    handleEditClient()
  } else {
    handleCreateClient()
  }

  handleCloseDialog()
}

async function handleEditClient () {
  try {
    const clientId = client.value?.id ?? ''
    await clientStore.updateClient(clientId, clientInfoModel)
    notification.success('Client updated successfully')
  } catch {
    notification.error('Error updating client, please try again')
  }
}

async function handleCreateClient () {
  try {
    await clientStore.createClient(clientInfoModel)
    notification.success('Client created successfully')
  } catch {
    notification.error('Error creating client, please try again')
  }
}

function handleCloseDialog () {
  isOpen.value = false
}

watch(isOpen, (newVal: boolean): void => {
  if (newVal && client.value?.id) {
    Object.assign(clientInfoModel, client.value)
  } else {
    clientInfoModel.name = ''
  }
})

defineExpose({
  open
})
</script>
