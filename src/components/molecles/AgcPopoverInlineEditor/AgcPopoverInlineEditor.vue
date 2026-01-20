<template>
  <AgcPopover
    ref="popoverInlineEditorRef"
    class="popover-inline-editor"
    popper-class="popover-inline-editor__popper-class"
  >
    <ul
      role="listbox"
      class="popover-inline-editor__options"
    >
      <li
        v-for="option in options"
        :key="option.value"
        :class="{ 'popover-inline-editor__options-item--selected': isSelected(option) }"
        role="option"
        class="popover-inline-editor__options-item"
        @click="handleSelect(option)"
        @keydown.enter.space.prevent="handleSelect(option)"
      >
        {{ option.label }}
      </li>
    </ul>
    <template #reference>
      <slot
        v-if="$slots.reference"
        name="reference"
      />
      <span v-else>
        {{ selectedOption?.label || '—' }}
      </span>
    </template>
  </AgcPopover>
</template>

<script setup lang="ts" generic="T extends AgcPopoverInlineEditorModelValue = string">
import { AgcPopover, type AgcPopoverInstance } from '@/components/atoms/AgcPopover'
import { ref, computed } from 'vue'
import type {
  AgcPopoverInlineEditorModelValue,
  IAgcPopoverInlineEditorProps,
  IAgcPopoverInlineEditorOption
} from './types'

const popoverInlineEditorRef = ref<AgcPopoverInstance | null>(null)

const modelValue = defineModel<T>({
  required: true
})

const {
  options = []
} = defineProps<IAgcPopoverInlineEditorProps<T>>()

const selectedOption = computed<IAgcPopoverInlineEditorOption<T> | null>(() => {
  return options.find(option => option.value === modelValue.value) ?? null
})

function isSelected (option: IAgcPopoverInlineEditorOption<T>): boolean {
  return option.value === modelValue.value
}

function handleSelect (option: IAgcPopoverInlineEditorOption<T>): void {
  modelValue.value = option.value
  popoverInlineEditorRef.value?.hide()
}
</script>

<style lang="scss">
.popover-inline-editor__popper-class {
  padding: 12px 0 !important;
  .popover-inline-editor__options {
    list-style: none;
    margin: 0;
    padding: 0;
    .popover-inline-editor__options-item {
      cursor: pointer;
      padding: 6px 24px;
      &:hover {
        background-color:  var(--el-bg-color-page);
      }
      &--selected {
        color: var(--el-color-primary);
        font-weight: 600;
      }
    }
  }
}
</style>
