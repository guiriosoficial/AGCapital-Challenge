<template>
  <ElDialog
    v-model="modelValue"
    v-bind="$attrs"
    :title="title"
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
  title = ''
} = defineProps<IAgcDialogProps>()
</script>

<style lang="scss">
.el-dialog {
  padding: 24px;
  .el-dialog__headerbtn {
    top: 12px;
    right: 12px;
  }
}
</style>
