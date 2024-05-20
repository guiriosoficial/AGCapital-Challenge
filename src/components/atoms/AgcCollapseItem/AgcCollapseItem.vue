<template>
  <ElCollapseItem
    v-bind="$attrs"
    :title="title"
    :name="name"
    :disabled="disabled"
  >
    <template #title>
      <slot name="title" />
    </template>
    <slot name="default" />
  </ElCollapseItem>
</template>

<script setup lang="ts">
import { ElCollapseItem } from 'element-plus'

defineOptions({
  name: 'ProjCollapseItem',
  inheritAttrs: false
})

defineProps({
  title: {
    type: String,
    default: ''
  },
  name: {
    type: [String, Number]
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
