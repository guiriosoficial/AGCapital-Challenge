<template>
  <ElDialog
    v-bind="$attrs"
    v-model="modelValue"
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :top="top"
    :modal="modal"
    :modal-class="modalClass"
    :append-to-body="appendToBody"
    :append-to="appendTo"
    :lock-scroll="lockScroll"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :draggable="draggable"
    :overflow="overflow"
    :center="center"
    :align-center="alignCenter"
    :destroy-on-close="destroyOnClose"
    :z-index="zIndex"
    :header-aria-level="headerAriaLevel"
    :before-close="beforeClose"
    :close-icon="closeIcon"
    @open="$emit('open', $event)"
    @opened="$emit('opened', $event)"
    @close="$emit('close', $event)"
    @closed="$emit('closed', $event)"
    @open-auto-focus="$emit('open-auto-focus', $event)"
    @close-auto-focus="$emit('close-auto-focus', $event)"
  >
    <template #header>
      <slot name="header" />
    </template>
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, type DialogBeforeCloseFn } from 'element-plus'
import type { Component, PropType } from "vue";

defineOptions({
  name: 'AgcDialog',
  inheritAttrs: false
})

const modelValue = defineModel<boolean>('modelValue', {
  required: true
})

defineProps({
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: ''
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  top: {
    type: String,
    default: ''
  },
  modal: {
    type: Boolean,
    default: true
  },
  modalClass: {
    type: String,
    default: undefined
  },
  appendToBody: {
    type: Boolean,
    default: false
  },
  appendTo: {
    type: String,
    default: 'body'
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: Function as PropType<DialogBeforeCloseFn>,
    default: undefined
  },
  draggable: {
    type: Boolean,
    default: false
  },
  overflow: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  alignCenter: {
    type: Boolean,
    default: false
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  closeIcon: {
    type: [String,  Object as () => Component],
    default: undefined
  },
  zIndex: {
    type: Number,
    default: undefined
  },
  headerAriaLevel: {
    type: String,
    default: '2'
  }
})

defineEmits([
  'open',
  'opened',
  'close',
  'closed',
  'open-auto-focus',
  'close-auto-focus'
])
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
