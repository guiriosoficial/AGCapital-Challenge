<template>
  <ElPopover
    :class="$attrs.class"
    :trigger="trigger"
    :placement="placement"
    :popper-class="popperClass"
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
import { ElPopover } from 'element-plus'
import type { IAgcPopoverProps } from './types'

const {
  trigger = 'hover',
  placement = 'bottom',
  popperClass,
} = defineProps<IAgcPopoverProps>()
</script>
