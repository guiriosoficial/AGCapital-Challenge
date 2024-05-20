<template>
  <ElCollapse
    v-bind="$attrs"
    v-model="modelValue"
    :accordion="accordion"
    @change="emit('change', $event)"
  >
    <slot name="default" />
  </ElCollapse>
</template>

<script setup lang="ts">
import { ElCollapse } from 'element-plus'

defineOptions({
  name: 'AgcCollapse',
  inheritAttrs: false
})

const modelValue = defineModel<string | string[]>('modelValue', {
  required: true,
  default: () => []
})

defineProps({
  accordion: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change'])
</script>
