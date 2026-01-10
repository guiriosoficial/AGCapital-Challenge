<template>
  <ElCollapseItem
    :class="$attrs.class"
    :title="title"
    :name="name"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <slot />
  </ElCollapseItem>
</template>

<script setup lang="ts">
import { ElCollapseItem } from 'element-plus'
import type { IAgcCollapseItemProps } from './typea.ts'

const {
  title = '',
  name,
} = defineProps<IAgcCollapseItemProps>()
</script>
