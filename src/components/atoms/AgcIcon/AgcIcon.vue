<template>
  <ElIcon
    :class="$attrs.class"
    :color="color"
    :size="size"
    @click="emit('click', $event)"
  >
    <component :is="icon" />
  </ElIcon>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'
import type {
  IAgcIconEmits,
  IAgcIconProps
} from './types.ts'

const {
  color,
  size = '1em',
  icon
} = defineProps<IAgcIconProps>()

const emit = defineEmits<IAgcIconEmits>()
</script>

