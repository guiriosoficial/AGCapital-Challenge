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
  name: 'AgcCard',
  inheritAttrs: true
})

defineProps({
  color: {
    type: String,
    default: undefined
  },
  size: {
    type: [String, Number],
    default: '1em'
  },
  icon: {
    type: Object as PropType<Component>,
    default: undefined
  }
})
</script>
