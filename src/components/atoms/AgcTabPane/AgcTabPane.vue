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
  name: 'AgcTabPane',
  inheritAttrs: false
})

defineProps({
  label: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
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
