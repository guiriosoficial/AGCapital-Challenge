<!-- TODO: Remove @tab-change (use @update) -->
<template>
  <ElTabs
    v-model="modelValue"
    v-bind="$attrs"
  >
    <slot />
  </ElTabs>
</template>

<script setup lang="ts">
import { ElTabs } from 'element-plus'
import type { AgcTabsModelValue } from './types'

defineOptions({
  name: 'AgcTabs',
  inheritAttrs: false
})

const modelValue = defineModel<AgcTabsModelValue>({
  required: true
})
</script>
