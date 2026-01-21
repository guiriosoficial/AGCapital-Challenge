<template>
  <AgcDialog
    v-model="isOpen"
    :title="dialogTitle"
    :disabled="loading"
  >
    <AgcForm
      ref="clientFormRef"
      :model="clientForm"
      :rules="clientFormRules"
    >
      <AgcFormItem
        label="Client name"
        prop="name"
        required
      >
        <AgcInput
          v-model="clientForm.name"
          :disabled="loading"
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
        @click="handleValidateClient"
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
import { useDialog } from '@/composables/useDialog'
import { ClientForm } from '@/models/clientModel'
import type { IClientFormDialogProps, IClientFormDialogEmits, IClientInfoDialogProps } from './types'

const {
  props: client,
  isOpen,
  open,
  close
} = useDialog<IClientFormDialogProps>()

const { loading } = defineProps<IClientInfoDialogProps>()

const emit = defineEmits<IClientFormDialogEmits>()

const clientFormRef = ref<AgcFormInstance | null>(null)

const clientForm = reactive<ClientForm>(new ClientForm())

const clientFormRules = reactive<AgcFormRules<ClientForm>>({
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
  clientFormRef?.value?.validate((valid) => {
    if (!valid) return

    handleUpdateCreateClient()
  })
}

function handleUpdateCreateClient () {
  if (isEditingClient.value) {
    const eventForm = {
      id: client.value!.id,
      ...clientForm
    }
    emit('submit:update', eventForm)
  } else {
    emit('submit:create', { ...clientForm })
  }
}

function handleCloseDialog () {
  clientFormRef.value?.resetFields()
  clientFormRef.value?.resetValidation()
  isOpen.value = false
}


// TODO: Evitar que ID seja setado no clientForm
watch(isOpen, (newVal: boolean): void => {
  if (newVal && isEditingClient.value && client.value) {
    const { id: _id, ...form } = client.value
    Object.assign(clientForm, form)
  } else {
    Object.assign(clientForm, new ClientForm())
  }
})

defineExpose({
  open,
  close
})
</script>
