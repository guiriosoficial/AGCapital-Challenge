<template>
  <ElDialog
    v-model="modelValue"
    v-bind="$attrs"
    :title="title"
    :close-on-click-modal="!disabled"
    :close-on-press-escape="!disabled"
    :show-close="!disabled"
    destroy-on-close
  >
    <slot />
    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus'
import type { AgcDialogModelValue, IAgcDialogProps } from './types'

defineOptions({
  name: 'AgcDialog',
  inheritAttrs: false
})

const modelValue = defineModel<AgcDialogModelValue>({
  required: true
})

const {
  title = '',
  disabled = false
} = defineProps<IAgcDialogProps>()
</script>
