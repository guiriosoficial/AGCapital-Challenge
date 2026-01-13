<template>
  <ElForm
    ref="instance"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :label-position="labelPosition"
  >
    <slot />
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { IAgcFormProps, IAgcFormExpose } from './types'

// TODO: Remove FormInstance
const instance = ref<FormInstance | null>()

defineOptions({
  name: 'AgcForm',
  inheritAttrs: false
})

const {
  model = {},
  rules = {},
  labelPosition = 'right',
} = defineProps<IAgcFormProps>()

defineExpose<IAgcFormExpose>({
  validate: (cb) => instance.value?.validate(cb)
})
</script>
