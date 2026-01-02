<template>
  <ElTabs
    v-bind="$attrs"
    v-model="modelValue"
    :type="type"
    :closable="closable"
    :addable="addable"
    :editable="editable"
    :tab-position="tabPosition"
    :stretch="stretch"
    :before-leave="beforeLeave"
    @tab-click="$emit('tab-click', $event)"
    @tab-remove="$emit('tab-remove', $event)"
    @tab-add="$emit('tab-add', $event)"
    @tab-change="$emit('tab-change', $event)"
    @edit="$emit('edit', $event)"
  >
    <template
      v-if="$slots.addIcon"
      #add-icon
    >
      <slot name="add-icon" />
    </template>
    <slot />
  </ElTabs>
</template>

<script setup lang="ts">
import { ElTabs } from 'element-plus'
import type { Awaitable } from '@vueuse/core'
import type { TabPaneName } from 'element-plus'
import type { PropType } from 'vue'

defineOptions({
  name: 'AgcTabs',
  inheritAttrs: false
})

const modelValue = defineModel<string | number>('modelValue', {
  required: true
})

defineProps({
  type: {
    type: String as PropType<'card' | 'border-card'>,
    default: undefined
  },
  closable: {
    type: Boolean,
    default: false
  },
  addable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  tabPosition: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    default: 'top'
  },
  stretch: {
    type: Boolean,
    default: false
  },
  beforeLeave: {
    type: Function as PropType<(newName: TabPaneName, oldName: TabPaneName) => Awaitable<boolean | void> | undefined>,
    default: undefined
  }
})

defineEmits([
  'tab-click',
  'tab-remove',
  'tab-add',
  'edit',
  'tab-change'
])
</script>
