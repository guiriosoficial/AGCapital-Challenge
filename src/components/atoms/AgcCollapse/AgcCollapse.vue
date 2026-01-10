<template>
  <ElCollapse
    v-model="modelValue"
    :class="$attrs.class"
    @change="emit('change', $event)"
  >
    <slot />
  </ElCollapse>
</template>

<script setup lang="ts">
import { ElCollapse } from 'element-plus'
import type {
  AgcCollapseModelValue,
  IAgcCollapseEmits,
} from './types.ts'

const modelValue = defineModel<AgcCollapseModelValue | AgcCollapseModelValue[]>({
  default: () => []
})

const emit = defineEmits<IAgcCollapseEmits>()
</script>
