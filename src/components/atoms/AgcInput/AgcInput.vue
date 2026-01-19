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

<script setup lang="ts" generic="T extends AgcInputModelValue = string">
import { ElInput, type InputInstance } from 'element-plus'
import { ref } from 'vue'
import type { AgcInputModelValue, IAgcInputProps } from './types'

const inputInstanceRef = ref<InputInstance | null>(null)

defineOptions({
  name: 'AgcInput',
  inheritAttrs: false
})

const modelValue = defineModel<T>({
  required: true
})

const {
  type = 'text',
  placeholder = '',
  disabled = false,
  prefixIcon,
} = defineProps<IAgcInputProps>()
</script>
