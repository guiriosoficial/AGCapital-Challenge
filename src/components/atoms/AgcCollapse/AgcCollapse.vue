<template>
  <ElCollapse v-bind="$attrs">
    <slot />
  </ElCollapse>
</template>

<script setup lang="ts">
import { ElCollapse } from 'element-plus'

defineOptions({
  name: 'AgcCollapse',
  inheritAttrs: false
})
</script>
