<template>
  <ElTabPane
    v-bind="$attrs"
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

defineOptions({
  name: 'AgcTabPane',
  inheritAttrs: false
})

const {
  label,
  name,
  disabled = false,
} = defineProps<IAgcTabPaneProps>()
</script>
