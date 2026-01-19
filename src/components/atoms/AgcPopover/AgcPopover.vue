<template>
  <ElPopover
    ref="popoverInstanceRef"
    v-bind="$attrs"
    :placement="placement"
    :popper-class="popperClass"
    trigger="click"
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

<script setup lang="ts">
import { ElPopover, type PopoverInstance } from 'element-plus'
import { ref } from 'vue'
import type { IAgcPopoverProps, IAgcInputExpose } from './types'

const popoverInstanceRef = ref<PopoverInstance | null>(null)

defineOptions({
  name: 'AgcPopover',
  inheritAttrs: false
})

const {
  placement = 'bottom',
  popperClass,
} = defineProps<IAgcPopoverProps>()

defineExpose<IAgcInputExpose>({
  hide: () => popoverInstanceRef.value?.hide()
})
</script>
