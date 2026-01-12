<template>
  <div class="popover-inline-editor">
    <AgcPopover
      ref="popoverEditor"
      placement="bottom"
      trigger="click"
      class="popover-inline-editor__popover"
      popper-class="popover-inline-editor__popper-class"
    >
      <ul
        role="listbox"
        class="popover-inline-editor__list"
      >
        <li
          v-for="option in options"
          :key="option.value"
          :class="{ 'popover-inline-editor__option--selected': isSelected(option) }"
          role="option"
          class="popover-inline-editor__option"
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
  </div>
</template>

<script setup lang="ts">
import AgcPopover from '@/components/atoms/AgcPopover'
import { ref, computed } from 'vue'
import type {
  AgcPopoverInlineEditorModelValue,
  IAgcPopoverInlineEditorProps,
  IAgcPopoverInlineEditorOption
} from './types.ts'

const popoverEditor = ref<InstanceType<typeof AgcPopover> | null>(null)

const modelValue = defineModel<AgcPopoverInlineEditorModelValue>({
  required: true
})

const {
  options = []
} = defineProps<IAgcPopoverInlineEditorProps>()

const selectedOption = computed<IAgcPopoverInlineEditorOption | null>(() => {
  return options.find(option => option.value === modelValue.value) ?? null
})

function isSelected (option: IAgcPopoverInlineEditorOption): boolean {
  return option.value === modelValue.value
}

function handleSelect (option: IAgcPopoverInlineEditorOption): void {
  modelValue.value = option.value
  popoverEditor.value?.hide()
}
</script>

<style lang="scss">
  .popover-inline-editor__popper-class {
    padding: 12px 0 !important;

    .popover-inline-editor__list {
      list-style: none;
      margin: 0;
      padding: 0;
      .popover-inline-editor__option {
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
