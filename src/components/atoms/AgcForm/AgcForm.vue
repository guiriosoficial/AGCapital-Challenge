<template>
  <ElForm
    ref="formInstanceRef"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    label-position="top"
  >
    <slot />
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm, type FormInstance } from 'element-plus'
import { ref } from 'vue'
import type { IAgcFormProps, IAgcFormExpose } from './types'

const formInstanceRef = ref<FormInstance | null>(null)

defineOptions({
  name: 'AgcForm',
  inheritAttrs: false
})

const {
  model = {},
  rules = {},
} = defineProps<IAgcFormProps>()

defineExpose<IAgcFormExpose>({
  validate: (cb) => formInstanceRef.value?.validate(cb),
  resetFields: () => formInstanceRef.value?.resetFields(),
  resetValidation: () => formInstanceRef.value?.clearValidate()
})
</script>
