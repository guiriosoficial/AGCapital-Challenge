<template>
  <ElTag
    v-bind="$attrs"
    :type="type"
  >
    <slot />
  </ElTag>
</template>

<script setup lang="ts">
import { ElTag } from 'element-plus'
import type { IAgcTagProps } from './types.ts'

defineOptions({
  name: 'AgcTag',
  inheritAttrs: false
})

const {
  type = 'primary',
} = defineProps<IAgcTagProps>()
</script>
