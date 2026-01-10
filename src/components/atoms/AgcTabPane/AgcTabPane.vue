<!-- TODO: Verificar/Implementar Props v-loading, :key (v-bind) -->
<template>
  <ElTabPane
    :label="label"
    :name="name"
    :disabled="disabled"
  >
    <template
      v-if="$slots.label"
      #label
    >
      <slot name="label" />
    </template>
    <slot />
  </ElTabPane>
</template>

<script setup lang="ts">
import { ElTabPane } from 'element-plus'
import type { IAgcTabPaneProps } from './types.ts'

const {
  label,
  name,
  disabled = false,
} = defineProps<IAgcTabPaneProps>()
</script>
