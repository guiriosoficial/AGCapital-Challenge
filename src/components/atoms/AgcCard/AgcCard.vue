<!-- TODO: shadow="hover" as default-->
<template>
  <ElCard
    v-bind="$attrs"
    :body-class="bodyClass"
    :shadow="shadow"
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
import type { IAgcCardProps, IAgcCardEmits } from './types.ts'

defineOptions({
  name: 'AgcCard',
  inheritAttrs: false
})

const {
  bodyClass,
  shadow = 'hover'
} = defineProps<IAgcCardProps>()

const emit = defineEmits<IAgcCardEmits>()
</script>
