<template>
  <ElForm
    v-bind="$attrs"
    ref="instance"
    :model="model"
    :rules="rules"
    :inline="inline"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :label-suffix="labelSuffix"
    :hide-required-asterisk="hideRequiredAsterisk"
    :require-asterisk-position="requireAsteriskPosition"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :status-icon="statusIcon"
    :validate-on-rule-change="validateOnRuleChange"
    :size="size"
    :disabled="disabled"
    :scroll-to-error="scrollToError"
    :scroll-into-view-options="scrollIntoViewOptions"
    @validate="$emit('validate', $event)"
  >
    <slot name="default" />
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { ref, type PropType } from 'vue'

defineOptions({
  name: 'AgcForm',
  inheritAttrs: false
})

const instance = ref<FormInstance | null>()

defineProps({
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({})
  },
  inline: {
    type: Boolean,
    default: false
  },
  labelPosition: {
    type: String as PropType<'top' | 'left' | 'right'>,
    default: 'right'
  },
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false
  },
  requireAsteriskPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  inlineMessage: {
    type: Boolean,
    default: false
  },
  statusIcon: {
    type: Boolean,
    default: false
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'' | 'large' | 'default' | 'small'>,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  scrollToError: {
    type: Boolean,
    default: false
  },
  scrollIntoViewOptions: {
    type: [Boolean, Object as () => ScrollIntoViewOptions],
  }
})

defineEmits(['validate'])
defineExpose({ instance })
</script>
