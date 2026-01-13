<template>
  <ElCard
    v-bind="$attrs"
    :body-class="bodyClass"
    shadow="hover"
    @click="emit('click', $event)"
  >
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>
    <slot />
  </ElCard>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus'
import type { IAgcCardProps, IAgcCardEmits } from './types'

defineOptions({
  name: 'AgcCard',
  inheritAttrs: false
})

const {
  bodyClass,
} = defineProps<IAgcCardProps>()

const emit = defineEmits<IAgcCardEmits>()
</script>
