<template>
  <ElCard :shadow="shadow">
    <slot name="default" />
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
  </ElCard>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus'
import type { PropType } from 'vue'

defineOptions({
  name: 'ProjCard',
  inheritAttrs: true
})

defineProps({
  shadow: {
    type: String as PropType<'always' | 'hover' | 'never'>,
    default: 'always'
  }
})
</script>
