<template>
  <ElInput
    ref="inputInstanceRef"
    v-model="modelValue"
    v-bind="$attrs"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :prefix-icon="prefixIcon"
  />
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import { ref } from 'vue'
import type { AgcInputModelValue, IAgcInputProps } from './types'

// TODO: Review instance type
const inputInstanceRef = ref<unknown>(null)

defineOptions({
  name: 'AgcInput',
  inheritAttrs: false
})

const modelValue = defineModel<AgcInputModelValue>({
  required: true
})

const {
  type = 'text',
  placeholder = '',
  disabled = false,
  prefixIcon,
} = defineProps<IAgcInputProps>()
</script>
