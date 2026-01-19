<template>
  <ElTabs
    v-model="modelValue"
    v-bind="$attrs"
  >
    <slot />
  </ElTabs>
</template>

<script setup lang="ts" generic="T extends AgcTabsModelValue">
import { ElTabs } from 'element-plus'
import type { AgcTabsModelValue } from './types'

defineOptions({
  name: 'AgcTabs',
  inheritAttrs: false
})

const modelValue = defineModel<T>({
  required: true
})
</script>
