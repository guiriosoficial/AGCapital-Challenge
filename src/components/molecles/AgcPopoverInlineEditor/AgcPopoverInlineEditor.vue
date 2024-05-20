<template>
  <div class="popover-inline-editor">
    <el-popover
      ref="popoverEditor"
      placement="bottom"
      trigger="click"
      class="popover-inline-editor__popover"
      popper-class="popover-inline-editor__popper-class"
    >
      <ul class="popover-inline-editor__list">
        <li
          v-for="option in options"
          :key="option.value"
          :class="{ 'popover-inline-editor__option--selected': option.value === modelValue }"
          class="popover-inline-editor__option"
          @click="handleSelect(option)"
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
          {{ selectedOption.label }}
        </span>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, type PropType } from 'vue'

const popoverEditor = ref()

const props = defineProps({
  modelValue: {
    type: [String, Boolean],
    default: ''
  },
  options: {
    type: Array as PropType<Option[]>,
    default: [] as Option[]
  }
})

const emit = defineEmits(['change'])

const selectedOption = computed((): Option => {
  const optionIndex = props.options.findIndex(
    (option: Option) => option.value === props.modelValue
  )

  if (optionIndex >= 0) { return props.options[optionIndex] }
  return { value: '', label: '' }
})

function handleSelect ({ value }: Option): void {
    if (props.modelValue !== value) {
      emit('change', value)
    }

    popoverEditor.value.hide()
}

interface Option {
  value: string | number
  label: string
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
