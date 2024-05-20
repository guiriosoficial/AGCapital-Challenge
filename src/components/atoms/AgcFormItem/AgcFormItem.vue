<template>
  <ElFormItem
    v-bind="$attrs"
    :prop="prop"
    :label="label"
    :label-width="labelWidth"
    :required="required"
    :rules="rules"
    :error="error"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :size="size"
  >
    <!-- :for="for"
    :validate-status="validateStatus" -->
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
    type: String as PropType<string | string[]>
  },
  label: {
    type: String
  },
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  required: {
    type: Boolean
  },
  rules: {
    type: Object as PropType<Record<string, any>>
  },
  error: {
    type: String
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  inlineMessage: {
    type: [Boolean, String],
    default: ''
  },
  size: {
    type: String as PropType<'' | 'large' | 'default' | 'small'>
  },
  for: {
    type: String
  },
  validateStatus: {
    type: String as PropType<'' | 'error' | 'validating' | 'success'>
  }
})
</script>
