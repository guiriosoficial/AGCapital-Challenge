<template>
  <ElFormItem
    v-bind="$attrs"
    :for="forEl"
    :prop="prop"
    :label="label"
    :label-width="labelWidth"
    :required="required"
    :rules="rules"
    :error="error"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :size="size"
    :validate-status="validateStatus"
  >
    <template #label>
      <slot name="label" />
    </template>
    <slot name="default" />
    <template #error>
      <slot name="error" />
    </template>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem } from 'element-plus'
import type { PropType } from 'vue'

defineOptions({
  name: 'AgcFormItem',
  inheritAttrs: false
})

defineProps({
  prop: {
    type: String as PropType<string | string[]>,
    default: undefined
  },
  label: {
    type: String,
    default: undefined
  },
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  required: {
    type: Boolean
  },
  rules: {
    type: Object as PropType<Record<string, string>>,
    default: undefined
  },
  error: {
    type: String,
    default: undefined
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  inlineMessage: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'' | 'large' | 'default' | 'small'>,
    default: undefined
  },
  forEl: {
    type: String,
    default: undefined
  },
  validateStatus: {
    type: String as PropType<'' | 'error' | 'validating' | 'success'>,
    default: undefined
  }
})
</script>
