<template>
  <ElTabPane
    :label="label"
    :name="name"
    :disabled="disabled"
    :closable="closable"
    :lazy="lazy"
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

defineOptions({
  name: 'ProjTabPane'
  // inheritAttrs: false
})

defineProps({
  label: {
    type: String
  },
  name: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  lazy: {
    type: Boolean,
    default: false
  }
})
</script>
