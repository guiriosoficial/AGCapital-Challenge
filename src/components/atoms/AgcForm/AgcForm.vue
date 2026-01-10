<!-- TODO: Verificar/Implementar defineExpose, @validate -->
<template>
  <ElForm
    ref="instance"
    :class="$attrs.class"
    :model="model"
    :rules="rules"
    :label-position="labelPosition"
  >
    <slot />
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import type {
  IAgcFormProps,
  IAgcFormExpose
} from './types'

const instance = ref<FormInstance | null>()

const {
  model = {},
  rules = {},
  labelPosition = 'right',
} = defineProps<IAgcFormProps>()

defineExpose<IAgcFormExpose>({ instance })
</script>
