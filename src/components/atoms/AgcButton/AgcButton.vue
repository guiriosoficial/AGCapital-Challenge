<template>
  <ElButton
    :class="$attrs.class"
    :style="$attrs.style"
    :type="type"
    :link="link"
    :disabled="disabled"
    :icon="icon"
    @click="emit('click', $event)"
  >
    <slot />
  </ElButton>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import type {
  IAgcButtonEmits,
  IAgcButtonProps
} from './types.ts'

const {
  type = '',
  disabled = false,
  link = false,
  icon,
} = defineProps<IAgcButtonProps>()

const emit = defineEmits<IAgcButtonEmits>()
</script>
