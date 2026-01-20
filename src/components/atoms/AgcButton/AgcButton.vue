<template>
  <ElButton
    v-bind="$attrs"
    :type="type"
    :link="link"
    :disabled="disabled"
    :icon="icon"
    :loading="loading"
    @click="emit('click', $event)"
  >
    <slot />
  </ElButton>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import type { IAgcButtonProps, IAgcButtonEmits } from './types'

defineOptions({
  name: 'AgcButton',
  inheritAttrs: false
})

const {
  type = '',
  disabled = false,
  link = false,
  loading = false,
  icon,
} = defineProps<IAgcButtonProps>()

const emit = defineEmits<IAgcButtonEmits>()
</script>
