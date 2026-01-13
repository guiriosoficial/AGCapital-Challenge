<template>
  <ElTabPane
    v-bind="$attrs"
    :label="label"
    :name="name"
    :disabled="disabled"
  >
    <slot />
  </ElTabPane>
</template>

<script setup lang="ts">
import { ElTabPane } from 'element-plus'
import type { IAgcTabPaneProps } from './types'

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
