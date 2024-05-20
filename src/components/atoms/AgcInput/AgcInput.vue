<template>
  <ElInput
    v-bind="$attrs"
    v-model="modelValue"
    :type="type"
    :maxlength="maxlength"
    :minlength="minlength"
    :show-word-limit="showWordLimit"
    :placeholder="placeholder"
    :clearable="clearable"
    :formatter="formatter"
    :parser="parser"
    :show-password="showPassword"
    :disabled="disabled"
    :size="size"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    :rows="rows"
    :autosize="autosize"
    :autocomplete="autocomplete"
    :name="name"
    :readonly="readonly"
    :max="max"
    :min="min"
    :step="step"
    :resize="resize"
    :autofocus="autofocus"
    :form="form"
    :label="label"
    :tabindex="tabindex"
    :validate-event="validateEvent"
    :input-style="inputStyle"
    @blur="$emit('blur', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @input="$emit('input', $event)"
    @clear="$emit('clear', $event)"
  >
    <template
      v-if="$slots.prefix"
      #prefix
    >
      <slot name="prefix" />
    </template>
    <template
      v-if="$slots.suffix"
      #suffix
    >
      <slot name="suffix" />
    </template>
    <template
      v-if="$slots.prepend"
      #prepend
    >
      <slot name="prepend" />
    </template>
    <template
      v-if="$slots.append"
      #append
    >
      <slot name="append" />
    </template>
  </ElInput>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import type { PropType, Component, CSSProperties } from 'vue'

defineOptions({
  name: 'AgcInput',
  inheritAttrs: false
})

const modelValue = defineModel<string, number>('modelValue', {
  required: true
})

defineProps({
  type: {
    type: String as PropType<'week' | 'textarea' | 'url' | 'time' | 'tel' | 'text' | 'password' | 'submit' | 'search' | 'reset' | 'range' | 'radio' | 'number' | 'month' | 'email' | 'image' | 'hidden' | 'file' | 'color' | 'datetime-local' | 'date' | 'checkbox' | 'button'>,
    default: 'text'
  },
  maxlength: {
    type: [String, Number],
    default: ''
  },
  minlength: {
    type: [String, Number],
    default: ''
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'default' | 'small' | 'large'>,
    default: 'default'
  },
  prefixIcon: {
    type: [String, Object as () => Component]
  },
  suffixIcon: {
    type: [String, Object as () => Component]
  },
  rows: {
    type: Number,
    default: 2
  },
  autosize: {
    type: [Boolean, Object], // Object as () => PropType<{ minRows?: number, maxRows?: number }>],
    default: false
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  name: {
    type: String
  },
  readonly: {
    type: Boolean,
    default: false
  },
  max: {},
  min: {},
  step: {},
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  form: {
    type: String
  },
  label: {
    type: String
  },
  tabindex: {
    type: [String, Number]
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  inputStyle: {
    type: [String, Object as () => CSSProperties | CSSProperties[]],
    default: () => {}
  }
})

defineEmits([
  'blur',
  'change',
  'focus',
  'input',
  'clear'
])
</script>
