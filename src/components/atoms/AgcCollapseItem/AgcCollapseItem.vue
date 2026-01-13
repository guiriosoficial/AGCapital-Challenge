<template>
  <ElCollapseItem
    v-bind="$attrs"
    :title="title"
  >
    <template
      v-if="$slots.title"
      #title
    >
      <slot name="title" />
    </template>
    <slot />
  </ElCollapseItem>
</template>

<script setup lang="ts">
import { ElCollapseItem } from 'element-plus'
import type { IAgcCollapseItemProps } from './typea.ts'

defineOptions({
  name: 'AgcCollapseItem',
  inheritAttrs: false
})

const {
  title = ''
} = defineProps<IAgcCollapseItemProps>()
</script>
