<template>
  <ElIcon
    v-bind="$attrs"
    :color="color"
    :size="size"
    @click="emit('click', $event)"
  >
    <component :is="icon" />
  </ElIcon>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'
import type { IAgcIconProps, IAgcIconEmits } from './types.ts'

defineOptions({
  name: 'AgcIcon',
  inheritAttrs: false
})

const {
  color,
  size = '1em',
  icon
} = defineProps<IAgcIconProps>()

const emit = defineEmits<IAgcIconEmits>()
</script>

