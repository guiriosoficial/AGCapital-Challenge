<template>
  <ElIcon
    v-bind="$attrs"
    :color="color"
    :size="size"
  >
    <component :is="icon" />
  </ElIcon>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'
import type { PropType, Component } from 'vue'

defineOptions({
  name: 'ProjCard',
  inheritAttrs: true
})

defineProps({
  color: {
    type: String,
  },
  size: {
    type: [String, Number],
    default: '1em'
  },
  icon: {
    type: Object as PropType<Component>
  }
})
</script>