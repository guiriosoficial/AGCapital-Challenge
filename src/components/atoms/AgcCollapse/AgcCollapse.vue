<!-- TODO: Remove @change -->
<template>
  <ElCollapse
    v-model="modelValue"
    v-bind="$attrs"
    @change="emit('change', $event)"
  >
    <slot />
  </ElCollapse>
</template>

<script setup lang="ts">
import { ElCollapse } from 'element-plus'
import type { AgcCollapseModelValue, IAgcCollapseEmits } from './types.ts'

defineOptions({
  name: 'AgcCollapse',
  inheritAttrs: false
})

const modelValue = defineModel<AgcCollapseModelValue | AgcCollapseModelValue[]>({
  default: () => []
})

const emit = defineEmits<IAgcCollapseEmits>()
</script>
