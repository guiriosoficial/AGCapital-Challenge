<template>
  <ElPopover
    v-bind="$attrs"
    v-model:visible="modelValue"
    :trigger="trigger"
    :effect="effect"
    :content="content"
    :width="width"
    :placement="placement"
    :disabled="disabled"
    :offset="offset"
    :transition="transition"
    :show-arrow="showArrow"
    :popper-options="popperOptions"
    :popper-class="popperClass"
    :popper-style="popperStyle"
    :show-after="showAfter"
    :hide-after="hideAfter"
    :auto-close="autoClose"
    :tabindex="tabindex"
    :teleported="teleported"
    :persistent="persistent"
    @show="$emit('show', $event)"
    @before-enter="$emit('before-enter', $event)"
    @after-enter="$emit('after-enter', $event)"
    @hide="$emit('hide', $event)"
    @before-leave="$emit('before-leave', $event)"
    @after-leave="$emit('after-leave', $event)"
  >
    <slot />
    <template
      v-if="$slots.reference"
      #reference
    >
      <slot name="reference" />
    </template>
  </ElPopover>
</template>

<script lang="ts" setup>
import { ElPopover } from 'element-plus'
import { type PropType } from 'vue'

defineOptions({
  name: 'AgcPopover',
  inheritAttrs: false
})

const modelValue = defineModel('modelValue', {
  type: Boolean,
  default: false,
  required: true
})

defineProps({
  trigger: {
    type: String as PropType<'click' | 'focus' | 'hover' | 'contextmenu'>,
    default: 'hover'
  },
  title: {
    type: String
  },
  effect: {
    type: String as PropType<'dark' | 'light'>,
    default: 'light'
  },
  content: {
    type: String
  },
  width: {
    type: [Number, String]
  },
  placement: {
    type: String as PropType<'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'>,
    default: 'bottom'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 12
  },
  transition: {
    type: String,
    default: 'el-fade-in-linear'
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  popperOptions: {
    type: Object,
    default: () => ({ modifiers: [{ name: 'computeStyles', options: { gpuAcceleration: false } }] })
  },
  popperClass: {
    type: String
  },
  popperStyle: {
    type: [String, Object]
  },
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  },
  tabindex: {
    type: Number
  },
  teleported: {
    type: Boolean,
    default: true
  },
  persistent: {
    type: Boolean,
    default: true
  }
})

defineEmits([
  'show',
  'before-enter',
  'after-enter',
  'hide',
  'before-leave',
  'after-leave'
])
</script>
