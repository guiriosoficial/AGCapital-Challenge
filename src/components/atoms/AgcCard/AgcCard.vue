<template>
  <ElCard
    :class="$attrs.class"
    :body-class="bodyClass"
    :shadow="shadow"
    @click="emit('click', $event)"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
  </ElCard>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus'
import type {
  IAgcCardEmits,
  IAgcCardProps
} from './types.ts'

const {
  bodyClass,
  shadow = 'always'
} = defineProps<IAgcCardProps>()

const emit = defineEmits<IAgcCardEmits>()
</script>
