<template>
  <ElButton
    v-bind="$attrs"
    :size="size"
    :type="type"
    :plain="plain"
    :text="text"
    :bg="bg"
    :link="link"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :autofocus="autofocus"
    :native-type="nativeType"
    :auto-insert-space="autoInsertSpace"
    :loading-icon="loadingIcon"
    :color="color"
    :dark="dark"
    :tag="tag"
    :icon="icon"
  >
    <slot name="default" />
    <template
      v-if="$slots.icon"
      #icon
    >
      <slot name="icon" />
    </template>
    <template
      v-if="$slots.loading"
      #loading
    >
      <slot name="loading" />
    </template>
  </ElButton>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import type { PropType, Component } from 'vue'

defineOptions({
  name: 'AgcInput',
  inheritAttrs: false
})

defineProps({
  size: {
    type: String as PropType<'default' | 'small' | 'large'>,
    default: 'default'
  },
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: ''
  },
  plain: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  bg: {
    type: Boolean,
    default: false
  },
  link: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingIcon: {
    type: Object as PropType<Component | String>,
    default: Loading
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object as PropType<Component | String>
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  autoInsertSpace: {
    type: Boolean
  },
  color: {
    type: String,
    default: ''
  },
  dark: {
    type: Boolean,
    default: false
  },
  tag: {
    // type: [String, Component],
    type: String,
    default: 'button'
  }
})
</script>
